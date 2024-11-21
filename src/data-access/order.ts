import { getCurrentSession } from "@/lib/auth/session";
import "server-only";
import { getCart } from "./cart";
import { stripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import { Order } from "@prisma/client";

export async function createOrder() {
  const { user } = await getCurrentSession();
  if (!user) return null;

  const cart = await getCart();
  if (!cart || !cart.items.length) return null;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(cart.totalAmount * 1.12),
    currency: "cad",
  });

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      paymentIntentId: paymentIntent.id,
      items: {
        create: cart.items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          unitPrice: item.product.price,
        })),
      },
    },
    include: {
      items: {
        select: {
          id: true,
          quantity: true,
          unitPrice: true,
          product: { select: { id: true, name: true, image: true } },
        },
      },
    },
  });

  await stripe.paymentIntents.update(paymentIntent.id, {
    metadata: { orderId: order.id, cartId: cart.id },
  });

  return order;
}

export async function getOrder() {
  const { user } = await getCurrentSession();
  if (!user) return null;

  const existingOrder = await prisma.order.findFirst({
    where: { userId: user.id, paymentStatus: "pending" },
  });
  if (!existingOrder) return null;

  const cart = await getCart();
  if (!cart || !cart.items.length) return null;

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
    include: {
      items: {
        select: {
          id: true,
          quantity: true,
          unitPrice: true,
          product: { select: { id: true, name: true, image: true } },
        },
      },
    },
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
