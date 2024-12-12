"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { createUrl } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function ClearSearchButton({ variant }: { variant?: ButtonProps["variant"] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Button
      type="button"
      variant={variant}
      onClick={() => {
        const newSearchParams = new URLSearchParams(searchParams.toString());
        newSearchParams.delete("shop_q");
        router.push(createUrl(pathname, newSearchParams), { scroll: false });
      }}
    >
      Clear search
    </Button>
  );
}
