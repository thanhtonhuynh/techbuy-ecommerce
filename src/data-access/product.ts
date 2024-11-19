import prisma from "@/lib/prisma";
import { NewProductInput } from "@/lib/validations/product";
import { cache } from "react";
import "server-only";

// Create a new product
export async function createProduct({
  name,
  description,
  price,
  image,
  category,
}: NewProductInput) {
  return await prisma.product.create({
    data: { name, description, price, image, category },
  });
}

// Get products
export const getProducts = cache(
  async ({
    sortKey,
    reverse,
    query = "",
  }: {
    sortKey?: string;
    reverse?: boolean;
    query?: string;
  }) => {
    if (sortKey) {
      return await prisma.product.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        },
        orderBy: {
          [sortKey]: reverse ? "desc" : "asc",
        },
      });
    }
    return await prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { description: { contains: query, mode: "insensitive" } },
        ],
      },
    });
  },
);

// Get products by category
export const getCategoryProducts = cache(async ({ category }: { category: string }) => {
  return await prisma.product.findMany({ where: { category } });
});

// Get a product by ID
export const getProductById = cache(async (id: string) => {
  return await prisma.product.findUnique({ where: { id } });
});
