"use client";

import { useCart } from "@/providers/CartProvider";
import { CartItem } from "@/types";
import { X } from "lucide-react";
import { removeItemAction } from "./actions";
import { toast } from "sonner";

export function RemoveItemButton({ item }: { item: CartItem }) {
  const payload = { productId: item.product.id };
  const { updateOptimisticItem } = useCart();

  return (
    <form
      action={async () => {
        updateOptimisticItem(item.product.id, "delete");
        const error = await removeItemAction(payload);
        if (error) toast.error(error);
      }}
    >
      <button
        type="submit"
        className="flex items-center rounded-full bg-foreground/50 p-1 text-background hover:bg-foreground/40"
      >
        <X size={16} />
      </button>
    </form>
  );
}
