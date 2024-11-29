import prisma from "@/lib/prisma";
import { CategoryInput } from "@/lib/validations/category";
import "server-only";

// Get all categories
export async function getCategories() {
  return await prisma.category.findMany();
}

// Create a new category
export async function createCategory(data: CategoryInput) {
  return await prisma.category.create({ data });
}
