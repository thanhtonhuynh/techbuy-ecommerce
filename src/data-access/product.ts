import prisma from "@/lib/prisma";
import { GetCategoryProductsOptions, GetProductsOptions } from "@/types";
import { Prisma, Product } from "@prisma/client";
import { cache } from "react";
import "server-only";
import slugify from "slugify";

// Create a new product
export async function createProduct({
  name,
  description,
  price,
  image,
  categoryId,
}: {
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
}) {
  let slug = slugify(name, { lower: true, strict: true });
  const existingSlug = await prisma.product.findUnique({ where: { slug } });
  if (existingSlug) {
    slug = `${slug}-${Date.now()}`;
  }

  return await prisma.product.create({
    data: { name, description, price, image, categoryId, slug },
  });
}

// Get products
export const getProducts = cache(
  async ({ status, sortKey, reverse, query = "", page = 1, perPage = 10 }: GetProductsOptions) => {
    const queryWords = query.split(" ").filter(Boolean);
    const nameConditions = queryWords.map((word) => ({
      name: { contains: word, mode: Prisma.QueryMode.insensitive },
    }));

    const whereConditions = Prisma.validator<Prisma.ProductWhereInput>()({
      status,
      AND: nameConditions,
      ...(sortKey === "purchasedCount" && { purchasedCount: { gt: 0 } }),
    });

    const products = await prisma.product.findMany({
      where: whereConditions,
      orderBy: {
        ...(sortKey && { [sortKey]: reverse ? "desc" : "asc" }),
      },
      // skip: (page - 1) * perPage,
      // take: perPage,
    });

    // const total = await prisma.product.count({ where: whereConditions });

    // return { products, total };
    return { products };
  },
);

// Get Admin Products
export const getAdminProducts = cache(
  async ({ status, sortKey, reverse, query = "", page = 1, perPage = 10 }: GetProductsOptions) => {
    const queryWords = query.split(" ").filter(Boolean);
    const nameConditions = queryWords.map((word) => ({
      name: { contains: word, mode: Prisma.QueryMode.insensitive },
    }));

    const whereConditions = Prisma.validator<Prisma.ProductWhereInput>()({
      status,
      AND: nameConditions,
    });

    const products = await prisma.product.findMany({
      where: whereConditions,
      orderBy: {
        ...(sortKey && { [sortKey]: reverse ? "desc" : "asc" }),
      },
      include: { category: true },
      omit: { categoryId: true },
      skip: (page - 1) * perPage,
      take: perPage,
    });

    const total = await prisma.product.count({ where: whereConditions });

    return { products, total };
  },
);

// Get products by category
export const getCategoryProducts = cache(
  async ({ categorySlug, status, sortKey, reverse }: GetCategoryProductsOptions) => {
    return await prisma.product.findMany({
      where: {
        status,
        category: { slug: categorySlug },
        ...(sortKey === "purchasedCount" && { purchasedCount: { gt: 0 } }),
      },
      orderBy: {
        ...(sortKey && { [sortKey]: reverse ? "desc" : "asc" }),
      },
    });
  },
);

// Get a product by ID
export const getProductById = cache(async (id: string) => {
  return await prisma.product.findUnique({
    where: { id },
    include: { category: true },
    omit: { categoryId: true },
  });
});

// Get a product by slug
export const getProductBySlug = cache(async (slug: string) => {
  return await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
    omit: { categoryId: true },
  });
});

// Delete a product
export async function deleteProduct(id: string) {
  return await prisma.product.delete({ where: { id } });
}

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
