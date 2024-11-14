"use client";

import { CartItem } from "@/types";
import { useActionState } from "react";
import { updateItemQuantityAction } from "./actions";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";

export function EditItemQuantityButton({
  item,
  type,
}: {
  item: CartItem;
  type: "plus" | "minus";
}) {
  const [message, formAction] = useActionState(updateItemQuantityAction, null);
  const payload = {
    productId: item.product.id,
    quantity: type === "plus" ? item.quantity + 1 : item.quantity - 1,
  };
  const actionWithVariant = formAction.bind(null, payload);

  return (
    <form action={actionWithVariant}>
      <button type="submit" className="flex items-center rounded-full p-2">
        {type === "plus" ? <Plus size={15} /> : <Minus size={15} />}
      </button>
    </form>
  );
}
