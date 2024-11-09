import prisma from "@/lib/prisma";
import { NewProductInput } from "@/lib/validations/product";
import { cache } from "react";
import "server-only";

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

export const getProducts = cache(async () => {
  return await prisma.product.findMany();
});
