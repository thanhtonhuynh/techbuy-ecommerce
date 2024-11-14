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
}: NewProductInput) {
  return await prisma.product.create({
    data: { name, description, price, image },
  });
}

// Get all products
export const getProducts = cache(async () => {
  return await prisma.product.findMany();
});

// Get a product by ID
export const getProductById = cache(async (id: string) => {
  return await prisma.product.findUnique({ where: { id } });
});
