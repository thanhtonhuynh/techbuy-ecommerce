"use client";

import { Button } from "@/components/ui/button";
import { SortFilterItem } from "@/constants";
import { cn, createUrl } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function FilterItem({ item, onClick }: { item: SortFilterItem; onClick?: () => void }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get("sort") === item.slug;

  const newSearchParams = new URLSearchParams(searchParams.toString());
  newSearchParams.delete("page");
  newSearchParams.delete("sort");

  const href = createUrl(
    pathname,
    new URLSearchParams({
      ...Object.fromEntries(newSearchParams),
      ...(item.slug && item.slug.length && { sort: item.slug }),
    }),
  );
  const DynamicTag = active ? "p" : Link;

  return (
    <li onClick={() => !active && onClick?.()}>
      <Button
        variant={"link"}
        className={cn(
          "w-full select-none justify-start text-muted-foreground",
          active && "font-semibold text-primary hover:no-underline",
        )}
        asChild
      >
        <DynamicTag href={href} prefetch={!active ? false : undefined}>
          {item.title}
        </DynamicTag>
      </Button>
    </li>
  );
}
