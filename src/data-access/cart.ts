import "server-only";
import { getCurrentSession } from "@/lib/auth/session";
import prisma from "@/lib/prisma";
import { Cart, CartWithProducts } from "@/types";
import { cookies } from "next/headers";
import { cache } from "react";
import { deleteCartTokenCookie, generateCartToken, setCartTokenCookie } from "@/utils/cart";
import { encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";

export async function addItem(cartId: string, productId: string) {
  return await prisma.cartItem.create({
    data: { cartId, productId, quantity: 1 },
  });
}

export async function updateItemQuantity(cartItemId: string, quantity: number) {
  return await prisma.cartItem.update({
    where: { id: cartItemId },
    data: { quantity },
  });
}

export async function removeItem(cartItemId: string) {
  return await prisma.cartItem.delete({ where: { id: cartItemId } });
}

function reshapeCart(cart: CartWithProducts): Cart {
  return {
    ...cart,
    items: cart.items.map((item) => ({
      ...item,
      totalAmount: item.quantity * item.product.price,
    })),
    totalQuantity: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    totalAmount: cart.items.reduce((acc, item) => acc + item.quantity * item.product.price, 0),
  };
}

export const getCart = cache(async (): Promise<Cart | null> => {
  const { user } = await getCurrentSession();

  let cart: CartWithProducts | null = null;
  if (user) {
    cart = await prisma.cart.findFirst({
      where: { userId: user.id },
      select: {
        items: {
          select: {
            product: {
              omit: { createdAt: true, updatedAt: true },
            },
            id: true,
            quantity: true,
          },
        },
        id: true,
        userId: true,
      },
    });
  } else {
    const localCartToken = (await cookies()).get("cartId")?.value;

    if (!localCartToken) return null;

    const localCartId = encodeHexLowerCase(sha256(new TextEncoder().encode(localCartToken)));

    cart = await prisma.cart.findUnique({
      where: { id: localCartId },
      select: {
        items: {
          select: {
            product: {
              omit: { createdAt: true, updatedAt: true },
            },
            id: true,
            quantity: true,
          },
        },
        id: true,
        userId: true,
      },
    });
  }

  if (!cart) return null;

  return reshapeCart(cart);
});

export async function createCart(): Promise<Cart> {
  const { user } = await getCurrentSession();

  const cartToken = generateCartToken();
  const cartId = encodeHexLowerCase(sha256(new TextEncoder().encode(cartToken)));

  const payload = user ? { id: cartId, userId: user.id } : { id: cartId };
  const newCart = await prisma.cart.create({
    data: payload,
  });

  if (!user) {
    await setCartTokenCookie(cartToken);
  }

  return {
    ...newCart,
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  };
}

export async function syncWithLocalCart(userId: string) {
  // Get local cart token from cookies
  const localCartToken = (await cookies()).get("cartId")?.value;
  if (!localCartToken) return;

  // Find local cart in database
  const localCartId = encodeHexLowerCase(sha256(new TextEncoder().encode(localCartToken)));
  const localCart = await prisma.cart.findUnique({
    where: { id: localCartId },
    include: { items: true },
  });
  if (!localCart) return;

  // Find user cart in database
  const userCart = await prisma.cart.findFirst({
    where: { userId },
    include: { items: true },
  });

  await prisma.$transaction(async (tx) => {
    if (!userCart) {
      // If user cart does not exist, update local cart with user ID
      await tx.cart.update({
        where: { id: localCartId },
        data: { userId },
      });
    } else {
      // If user cart exists, merge local cart items into user cart
      for (const item of localCart.items) {
        const existingItem = userCart.items.find((i) => i.productId === item.productId);

        if (existingItem) {
          await tx.cartItem.update({
            where: {
              cartId_productId: {
                cartId: userCart.id,
                productId: existingItem.productId,
              },
            },
            data: { quantity: existingItem.quantity + item.quantity },
          });
        } else {
          await tx.cartItem.create({
            data: {
              cartId: userCart.id,
              productId: item.productId,
              quantity: item.quantity,
            },
          });
        }
      }

      await tx.cart.delete({ where: { id: localCartId } });
    }

    await deleteCartTokenCookie();
  });
}

export async function deleteCart(cartId: string) {
  return await prisma.cart.delete({ where: { id: cartId } });
}
