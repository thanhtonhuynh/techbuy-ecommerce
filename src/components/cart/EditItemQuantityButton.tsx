"use client";

import { CartItem } from "@/types";
import { updateItemQuantityAction } from "./actions";
import { Minus, Plus } from "lucide-react";
import { useCart } from "@/providers/CartProvider";
import { toast } from "sonner";

export function EditItemQuantityButton({ item, type }: { item: CartItem; type: "plus" | "minus" }) {
  // const [message, formAction] = useActionState(updateItemQuantityAction, null);
  const payload = {
    productId: item.product.id,
    quantity: type === "plus" ? item.quantity + 1 : item.quantity - 1,
  };
  // const actionWithVariant = formAction.bind(null, payload);
  const { updateOptimisticItem } = useCart();

  return (
    <form
      action={async () => {
        updateOptimisticItem(item.product.id, type);
        // actionWithVariant();
        const error = await updateItemQuantityAction(payload);
        if (error) toast.error(error);
      }}
    >
      <button type="submit" className="flex items-center rounded-full p-2">
        {type === "plus" ? <Plus size={15} /> : <Minus size={15} />}
      </button>
    </form>
  );
}
