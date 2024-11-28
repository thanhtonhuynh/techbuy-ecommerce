import prisma from "@/lib/prisma";
import { GetProductsOptions } from "@/types";
import { Prisma, Product } from "@prisma/client";
import { cache } from "react";
import "server-only";

// Create a new product
export async function createProduct({
  name,
  description,
  price,
  image,
  category,
}: {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}) {
  return await prisma.product.create({
    data: { name, description, price, image, category },
  });
}

// Get products
export const getProducts = cache(
  async ({ status, sortKey, reverse, query = "", page = 1, perPage = 10 }: GetProductsOptions) => {
    const whereConditions = Prisma.validator<Prisma.ProductWhereInput>()({
      status,
      OR: [
        { name: { contains: query, mode: "insensitive" } },
        { description: { contains: query, mode: "insensitive" } },
      ],
      ...(sortKey === "purchasedCount" && { purchasedCount: { gt: 0 } }),
    });

    const products = await prisma.product.findMany({
      where: whereConditions,
      orderBy: {
        ...(sortKey && { [sortKey]: reverse ? "desc" : "asc" }),
      },
      skip: (page - 1) * perPage,
      take: perPage,
    });

    const total = await prisma.product.count({ where: whereConditions });

    return { products, total };
  },
);

// Get Admin Products
export const getAdminProducts = cache(
  async ({ status, sortKey, reverse, query = "", page = 1, perPage = 10 }: GetProductsOptions) => {
    const whereConditions = Prisma.validator<Prisma.ProductWhereInput>()({
      status,
      name: { contains: query, mode: "insensitive" },
      ...(sortKey === "purchasedCount" && { purchasedCount: { gt: 0 } }),
    });

    const products = await prisma.product.findMany({
      where: whereConditions,
      orderBy: {
        ...(sortKey && { [sortKey]: reverse ? "desc" : "asc" }),
      },
      skip: (page - 1) * perPage,
      take: perPage,
    });

    const total = await prisma.product.count({ where: whereConditions });

    return { products, total };
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
        where: { category: { contains: category, mode: "insensitive" } },
        orderBy: {
          [sortKey]: reverse ? "desc" : "asc",
        },
      });
    }
    return await prisma.product.findMany({
      where: { category: { contains: category, mode: "insensitive" } },
    });
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
