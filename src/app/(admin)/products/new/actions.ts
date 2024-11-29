"use server";

import { createProduct } from "@/data-access/product";
import { getCurrentSession } from "@/lib/auth/session";
import { uploadFileToS3 } from "@/lib/s3";
import { NewProductSchema, ProductInput } from "@/lib/validations/product";
import { hasAccess } from "@/utils/access-control";
import { authenticatedRateLimit, rateLimitByKey } from "@/utils/rate-limiter";

export async function addProductAction(data: ProductInput) {
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

    const parsedData = NewProductSchema.parse(data);

    const imageUrl = await uploadFileToS3(parsedData.image[0]);

    await createProduct({ ...parsedData, image: imageUrl });
  } catch (error) {
    console.error(error);
    return "Create product failed.";
  }
}
