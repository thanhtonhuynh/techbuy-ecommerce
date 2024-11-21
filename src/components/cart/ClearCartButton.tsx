"use client";

import { useCart } from "@/providers/CartProvider";
import { clearCartAction } from "./actions";
import { toast } from "sonner";
import { Button } from "../ui/button";

export function ClearCartButton() {
  const { clearOptimisticCart } = useCart();

  return (
    <form
      action={async () => {
        clearOptimisticCart();
        const error = await clearCartAction();
        if (error) toast.error(error);
      }}
      className="text-right"
    >
      <Button type="submit" variant={`link`}>
        Clear Cart
      </Button>
    </form>
  );
}
