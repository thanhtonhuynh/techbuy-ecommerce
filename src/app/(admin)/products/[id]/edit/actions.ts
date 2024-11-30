"use server";

import { getProductById, updateProduct } from "@/data-access/product";
import { getCurrentSession } from "@/lib/auth/session";
import { deleteFileFromS3, uploadFileToS3 } from "@/lib/s3";
import { EditProductSchema, ProductInput } from "@/lib/validations/product";
import { hasAccess } from "@/utils/access-control";
import { authenticatedRateLimit, rateLimitByKey } from "@/utils/rate-limiter";

export async function editProductAction(id: string, data: ProductInput) {
  try {
    const { user } = await getCurrentSession();
    if (!user || user.accountStatus !== "active" || !hasAccess(user.role, "/admin")) {
      return "Unauthorized";
    }

    if (!(await authenticatedRateLimit(user.id))) {
      return "Too many requests.";
    }

    if (
      !(await rateLimitByKey({
        key: `${user.id}-create-product`,
        limit: 3,
        interval: 30000,
      }))
    ) {
      return "Too many requests.";
    }

    const parsedData = EditProductSchema.parse(data);

    const product = await getProductById(id);
    if (!product) {
      return "Product not found.";
    }

    if (parsedData.image.length) {
      await deleteFileFromS3(product.image);
      const imageUrl = await uploadFileToS3(parsedData.image[0]);
      await updateProduct(id, { ...parsedData, image: imageUrl });
    } else {
      await updateProduct(id, { ...parsedData, image: product.image });
    }
  } catch (error) {
    console.error(error);
    return "Edit product failed.";
  }
}
