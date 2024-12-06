import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { Cart, GetOrdersOptions, Order, OrderWithProducts } from "@/types";
import { Prisma, Order as PrismaOrder } from "@prisma/client";
import { cache } from "react";
import "server-only";

export async function createOrder(userId: string, cart: Cart) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(cart.totalAmount * 1.12),
    currency: "cad",
  });

  const order = await prisma.order.create({
    data: {
      userId: userId,
      paymentIntentId: paymentIntent.id,
      items: {
        create: cart.items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          unitPrice: item.product.price,
        })),
      },
    },
    select: { id: true },
  });

  await stripe.paymentIntents.update(paymentIntent.id, {
    metadata: { orderId: order.id, cartId: cart.id },
  });

  return order;
}

export async function retrieveAndUpdateOrder(userId: string, cart: Cart) {
  const existingOrder = await prisma.order.findFirst({
    where: { userId: userId, paymentStatus: "pending" },
  });
  if (!existingOrder) return null;

  await stripe.paymentIntents.update(existingOrder.paymentIntentId, {
    amount: Math.round(cart.totalAmount * 1.12),
  });

  const order = await prisma.order.update({
    where: { id: existingOrder.id },
    data: {
      items: {
        deleteMany: {},
        create: cart.items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          unitPrice: item.product.price,
        })),
      },
    },
    select: { id: true },
  });

  return order;
}

// Get order by payment intent id
export async function getOrderByPaymentIntentId(paymentIntentId: string) {
  return await prisma.order.findUnique({ where: { paymentIntentId } });
}

// Get order by id
export const getOrderById = cache(async (id: string) => {
  return await prisma.order.findUnique({ where: { id } });
});

// Get detailed order by payment intent id
export const getDetailedOrderByPaymentIntentId = cache(async (paymentIntentId: string) => {
  const order = await prisma.order.findUnique({
    where: { paymentIntentId },
    select: {
      items: {
        select: {
          product: {
            select: { id: true, name: true, image: true, slug: true },
          },
          id: true,
          quantity: true,
          unitPrice: true,
        },
      },
      id: true,
      user: { select: { id: true, name: true, email: true } },
      paymentIntentId: true,
      paymentStatus: true,
      deliveryStatus: true,
      createdAt: true,
      updatedAt: true,
      shipping: true,
      phone: true,
    },
  });

  return order && reshapeOrders([order])[0];
});

export async function updateOrder(id: string, data: Partial<PrismaOrder>) {
  return await prisma.order.update({
    where: { id },
    data,
  });
}

export async function getUserPendingOrder(userId: string) {
  return await prisma.order.findFirst({
    where: { userId, paymentStatus: "pending" },
  });
}

function reshapeOrders(orders: OrderWithProducts[]): Order[] {
  return orders.map((order) => ({
    ...order,
    items: order.items.map((item) => ({
      ...item,
      totalAmount: item.quantity * item.unitPrice,
    })),
    totalQuantity: order.items.reduce((acc, item) => acc + item.quantity, 0),
    totalAmount: order.items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0),
  }));
}

// Get all orders
export const getOrders = cache(async ({ query = "", page = 1, perPage = 10 }: GetOrdersOptions) => {
  const whereConditions = Prisma.validator<Prisma.OrderWhereInput>()({
    OR: [
      { paymentIntentId: { contains: query, mode: "insensitive" } },
      { user: { name: { contains: query, mode: "insensitive" } } },
      { user: { email: { contains: query, mode: "insensitive" } } },
    ],
  });

  const orders = await prisma.order.findMany({
    where: whereConditions,
    orderBy: { createdAt: "desc" },
    select: {
      items: {
        select: {
          product: {
            select: { id: true, name: true, image: true, slug: true },
          },
          id: true,
          quantity: true,
          unitPrice: true,
        },
      },
      id: true,
      user: { select: { id: true, name: true, email: true } },
      paymentIntentId: true,
      paymentStatus: true,
      deliveryStatus: true,
      createdAt: true,
      updatedAt: true,
      shipping: true,
      phone: true,
    },
    skip: (page - 1) * perPage,
    take: perPage,
  });

  const total = await prisma.order.count({ where: whereConditions });

  return { orders: reshapeOrders(orders), total };
});

// Get orders by user id
export const getOrdersByUserId = cache(async (userId: string, { query = "" }: GetOrdersOptions) => {
  const queryWords = query.split(" ").filter(Boolean);
  const productNameConditions = queryWords.map((word) => ({
    product: { name: { contains: word, mode: Prisma.QueryMode.insensitive } },
  }));
  const whereConditions = Prisma.validator<Prisma.OrderWhereInput>()({
    userId,
    OR: [
      { paymentIntentId: { contains: query, mode: "insensitive" } },
      { items: { some: { AND: productNameConditions } } },
    ],
  });

  const orders = await prisma.order.findMany({
    where: whereConditions,
    orderBy: { createdAt: "desc" },
    select: {
      items: {
        select: {
          product: {
            select: { id: true, name: true, image: true, slug: true },
          },
          id: true,
          quantity: true,
          unitPrice: true,
        },
      },
      id: true,
      user: { select: { id: true, name: true, email: true } },
      paymentIntentId: true,
      paymentStatus: true,
      deliveryStatus: true,
      createdAt: true,
      updatedAt: true,
      shipping: true,
      phone: true,
    },
  });

  return reshapeOrders(orders);
});
