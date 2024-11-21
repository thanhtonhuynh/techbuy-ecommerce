"use client";

import { useCart } from "@/providers/CartProvider";
import { useEffect, startTransition } from "react";
import { useRouter } from "next/navigation";

export function ClearOptimisticCart() {
  const { clearOptimisticCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    startTransition(() => {
      clearOptimisticCart();
    });

    router.refresh();
  }, []);

  return null;
}
