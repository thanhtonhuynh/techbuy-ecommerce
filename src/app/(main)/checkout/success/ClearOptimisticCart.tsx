"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function ClearOptimisticCart() {
  // const { clearOptimisticCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    // startTransition(async () => {
    // clearOptimisticCart();
    router.refresh();
    // });
  }, [router]);

  return null;
}
