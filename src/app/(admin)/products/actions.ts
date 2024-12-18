"use server";

import { deleteProduct, getProductById, updateProduct } from "@/data-access/product";
import { getCurrentSession } from "@/lib/auth/session";
import { deleteFileFromS3 } from "@/lib/s3";
import { hasAccess } from "@/utils/access-control";
import { authenticatedRateLimit, rateLimitByKey } from "@/utils/rate-limiter";
import { revalidatePath } from "next/cache";

export async function updateProductStatusAction(
  productId: string,
  status: "active" | "unavailable" | "draft" | "archived",
) {
  const { user } = await getCurrentSession();
  if (!user || user.accountStatus !== "active" || !hasAccess(user.role, "/admin")) {
    throw new Error("Unauthorized");
  }

  if (!(await authenticatedRateLimit(user.id))) {
    throw new Error("Too many requests.");
  }

  if (
    !(await rateLimitByKey({
      key: `${user.id}`,
      limit: 5,
      interval: 10000,
    }))
  ) {
    throw new Error("Too many requests.");
  }

  const product = await getProductById(productId);
  if (!product) {
    throw new Error("Product not found.");
  }

  if (product.status === status) {
    throw new Error("Product already has this status.");
  }

  await updateProduct(productId, { status });

  revalidatePath("/products");
}

export async function deleteProductAction(productId: string) {
  const { user } = await getCurrentSession();
  if (!user || user.accountStatus !== "active" || !hasAccess(user.role, "/admin")) {
    throw new Error("Unauthorized");
  }

  if (!(await authenticatedRateLimit(user.id))) {
    throw new Error("Too many requests.");
  }

  if (
    !(await rateLimitByKey({
      key: `${user.id}`,
      limit: 3,
      interval: 30000,
    }))
  ) {
    throw new Error("Too many requests.");
  }

  const product = await getProductById(productId);
  if (!product) {
    throw new Error("Product not found.");
  }

  await deleteFileFromS3(product.image);

  await deleteProduct(productId);

  revalidatePath("/products");
}
