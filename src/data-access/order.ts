import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { Cart, Order, OrderWithProducts } from "@/types";
import { Order as PrismaOrder } from "@prisma/client";
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
export async function getOrderById(id: string) {
  return await prisma.order.findUnique({ where: { id } });
}

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
export const getOrders = cache(async () => {
  const orders = await prisma.order.findMany({
    orderBy: { updatedAt: "desc" },
    select: {
      items: {
        select: {
          product: {
            select: { id: true, name: true, image: true },
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
      updatedAt: true,
      address: true,
    },
  });

  return reshapeOrders(orders);
});
