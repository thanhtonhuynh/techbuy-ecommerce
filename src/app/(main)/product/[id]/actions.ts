"use server";

import {
  addItem,
  createCart,
  getCart,
  updateItemQuantity,
} from "@/data-access/cart";
import { revalidatePath } from "next/cache";

export async function addToCartAction(productId: string) {
  try {
    const cart = (await getCart()) ?? (await createCart());

    const itemInCart = cart.items.find((item) => item.product.id === productId);

    if (itemInCart) {
      // await updateItemQuantity(cart.id, productId, itemInCart.quantity + 1);
      await updateItemQuantity(itemInCart.id, itemInCart.quantity + 1);
    } else {
      await addItem(cart.id, productId);
    }

    revalidatePath("/");
    return {};
  } catch (error) {
    console.error(error);
    return { error: "Something went wrong." };
  }
}
