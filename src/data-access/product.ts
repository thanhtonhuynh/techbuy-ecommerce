import prisma from "@/lib/prisma";
import { NewProductInput } from "@/lib/validations/product";
import { Product } from "@prisma/client";
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
      if (sortKey === "best-selling") {
        return await prisma.product.findMany({
          where: {
            OR: [
              { name: { contains: query, mode: "insensitive" } },
              { description: { contains: query, mode: "insensitive" } },
            ],
            purchasedCount: { gt: 0 },
          },
          orderBy: {
            purchasedCount: reverse ? "asc" : "desc",
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
export const getCategoryProducts = cache(
  async ({
    category,
    sortKey,
    reverse,
  }: {
    category: string;
    sortKey?: string;
    reverse?: boolean;
  }) => {
    if (sortKey) {
      return await prisma.product.findMany({
        where: { category },
        orderBy: {
          [sortKey]: reverse ? "desc" : "asc",
        },
      });
    }
    return await prisma.product.findMany({ where: { category } });
  },
);

// Get a product by ID
export const getProductById = cache(async (id: string) => {
  return await prisma.product.findUnique({ where: { id } });
});

// Update a product
export async function updateProduct(id: string, data: Partial<Product>) {
  return await prisma.product.update({ where: { id }, data });
}

// Update purchased count for products in an order, for each order item in an order, there's a quantity of the product purchased
export async function updateProductsPurchasedCount(orderId: string) {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: { items: { select: { productId: true, quantity: true } } },
  });

  if (!order) return;

  await Promise.all(
    order.items.map(async (item) => {
      await prisma.product.update({
        where: { id: item.productId },
        data: { purchasedCount: { increment: item.quantity } },
      });
    }),
  );
}
