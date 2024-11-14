import "server-only";
import { getCurrentSession } from "@/lib/auth/session";
import prisma from "@/lib/prisma";
import { Cart, CartWithProducts } from "@/types";
import { cookies } from "next/headers";
import { cache } from "react";
import { generateCartToken, setCartTokenCookie } from "@/utils/cart";
import { encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";

export async function addItem(cartId: string, productId: string) {
  return await prisma.cartItem.create({
    data: { cartId, productId, quantity: 1 },
  });
}

export async function updateItemQuantity(
  cartId: string,
  productId: string,
  quantity: number,
) {
  return await prisma.cartItem.update({
    where: { cartId_productId: { cartId, productId } },
    data: { quantity },
  });
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

    const cartId = encodeHexLowerCase(
      sha256(new TextEncoder().encode(localCartToken)),
    );

    cart = await prisma.cart.findUnique({
      where: { id: cartId },
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

  return {
    ...cart,
    totalQuantity: cart.items.reduce((acc, item) => acc + item.quantity, 0),
    totalAmount: cart.items.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0,
    ),
  };
});

export async function createCart(): Promise<Cart> {
  const { user } = await getCurrentSession();

  const cartToken = generateCartToken();
  const cartId = encodeHexLowerCase(
    sha256(new TextEncoder().encode(cartToken)),
  );

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
