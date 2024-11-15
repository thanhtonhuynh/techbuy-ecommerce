"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { addToCartAction } from "./actions";
import { toast } from "sonner";
import { useCart } from "@/providers/CartProvider";
import { Product } from "@prisma/client";

type AddToCartButtonProps = {
  product: Product;
};

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addOptimisticItem } = useCart();

  return (
    <form
      action={async () => {
        addOptimisticItem(product);
        const error = await addToCartAction(product.id);
        if (error) toast.error(error);
      }}
    >
      <Button type="submit">
        <ShoppingCart size={18} />
        Add to Cart
      </Button>
    </form>
  );
}
