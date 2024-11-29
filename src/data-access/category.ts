import prisma from "@/lib/prisma";
import "server-only";

// Get all categories
export async function getCategories() {
  return await prisma.category.findMany();
}
