"use server";

import { getCart, removeItem, updateItemQuantity } from "@/data-access/cart";
import { revalidatePath } from "next/cache";

export async function updateItemQuantityAction(
  prevState: any,
  payload: { productId: string; quantity: number },
) {
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
