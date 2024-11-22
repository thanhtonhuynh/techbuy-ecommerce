"use client";

import { useCart } from "@/providers/CartProvider";
import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

export function ClearOptimisticCart() {
  const { clearOptimisticCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    startTransition(() => {
      clearOptimisticCart();
      router.refresh();
    });
  }, []);

  return null;
}
