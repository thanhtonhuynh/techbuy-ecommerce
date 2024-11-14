"use client";

import { Button } from "@/components/ui/button";
import { Loader2, ShoppingCart } from "lucide-react";
import { useTransition } from "react";
import { addToCartAction } from "./actions";
import { toast } from "sonner";

type AddToCartButtonProps = {
  productId: string;
};

export function AddToCartButton({ productId }: AddToCartButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={() => {
        startTransition(async () => {
          const { error } = await addToCartAction(productId);
          if (!isPending && error) toast.error(error);
          else if (!isPending && !error) toast.success("Product added to cart");
        });
      }}
    >
      <Button disabled={isPending} type="submit">
        {isPending ? (
          <Loader2 className="size-5 animate-spin" />
        ) : (
          <ShoppingCart size={18} />
        )}
        Add to Cart
      </Button>
    </form>
  );
}
