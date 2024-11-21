"use server";

import { deleteCart, getCart, removeItem, updateItemQuantity } from "@/data-access/cart";
import { revalidatePath } from "next/cache";

export async function updateItemQuantityAction(payload: { productId: string; quantity: number }) {
  const { productId, quantity } = payload;

  try {
    const cart = await getCart();
    if (!cart) return "Error fetching cart";

    const itemInCart = cart.items.find((item) => item.product.id === productId);

    if (itemInCart) {
      if (quantity === 0) {
        await removeItem(itemInCart.id);
      } else {
        await updateItemQuantity(itemInCart.id, quantity);
      }
    } else {
      return "Item not found in cart";
    }

    revalidatePath("/");
  } catch (error) {
    console.error(error);
    return "Error updating item quantity";
  }
}

export async function removeItemAction(payload: { productId: string }) {
  const { productId } = payload;

  try {
    const cart = await getCart();
    if (!cart) return "Error fetching cart";

    const itemInCart = cart.items.find((item) => item.product.id === productId);

    if (itemInCart) {
      await removeItem(itemInCart.id);
    } else {
      return "Item not found in cart";
    }

    revalidatePath("/");
  } catch (error) {
    console.error(error);
    return "Error removing item";
  }
}

export async function clearCartAction() {
  try {
    const cart = await getCart();
    if (!cart) return "Error fetching cart";

    await deleteCart(cart.id);

    revalidatePath("/");
  } catch (error) {
    console.error(error);
    return "Error clearing cart";
  }
}
