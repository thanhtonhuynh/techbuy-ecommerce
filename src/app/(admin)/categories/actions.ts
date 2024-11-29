"use server";

import { createCategory } from "@/data-access/category";
import { getCurrentSession } from "@/lib/auth/session";
import { CategoryInput, CategorySchema } from "@/lib/validations/category";
import { hasAccess } from "@/utils/access-control";
import { authenticatedRateLimit, rateLimitByKey } from "@/utils/rate-limiter";
import { revalidatePath } from "next/cache";

export async function addCategoryAction(data: CategoryInput) {
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
        key: `${user.id}-create-category`,
        limit: 3,
        interval: 10000,
      }))
    ) {
      return "Too many requests.";
    }

    const parsedData = CategorySchema.parse(data);

    await createCategory(parsedData);

    revalidatePath("/categories");
  } catch (error) {
    console.error(error);
    return "Create category failed.";
  }
}
