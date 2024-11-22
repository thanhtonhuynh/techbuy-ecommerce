import "server-only";
import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import { Order } from "@prisma/client";
import { Cart } from "@/types";

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

export async function getOrderByPaymentIntentId(paymentIntentId: string) {
  return prisma.order.findUnique({ where: { paymentIntentId } });
}

export async function updateOrder(id: string, data: Partial<Order>) {
  return prisma.order.update({
    where: { id },
    data,
  });
}

export async function getUserPendingOrder(userId: string) {
  return prisma.order.findFirst({
    where: { userId, paymentStatus: "pending" },
  });
}
