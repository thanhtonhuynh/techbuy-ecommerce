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

// Update a category
export async function updateCategory(id: string, data: CategoryInput) {
  return await prisma.category.update({ where: { id }, data }).catch((error) => {
    throw new Error(`Failed to update category: ${error.message}`);
  });
}

// Delete a category
export async function deleteCategory(id: string) {
  return await prisma.category.delete({ where: { id } });
}

// Get a category by slug
export async function getCategoryBySlug(slug: string) {
  return await prisma.category.findUnique({ where: { slug } });
}