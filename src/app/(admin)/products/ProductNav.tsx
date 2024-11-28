"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ComponentProps } from "react";

export function ProductNav() {
  return (
    <nav className="flex w-fit space-x-2 rounded-md border p-1">
      <ProductNavLink href="/products" value="">
        All
      </ProductNavLink>
      <ProductNavLink href="/products?status=active" value="active">
        Active
      </ProductNavLink>
      <ProductNavLink href="/products?status=unavailable" value="unavailable">
        Unavailable
      </ProductNavLink>
      <ProductNavLink href="/products?status=draft" value="draft">
        Draft
      </ProductNavLink>
      <ProductNavLink href="/products?status=archived" value="archived">
        Archived
      </ProductNavLink>
    </nav>
  );
}

export function ProductNavLink(
  props: Omit<ComponentProps<typeof Link>, "className"> & { value: string },
) {
  const status = useSearchParams().get("status") || "";
  const isActive = status === props.value;

  return (
    <Button
      asChild
      variant={`link`}
      className={cn(
        "select-none px-2 font-normal text-muted-foreground",
        isActive && "font-semibold text-primary hover:no-underline",
      )}
    >
      {isActive ? <span>{props.children}</span> : <Link {...props} />}
    </Button>
  );
}
