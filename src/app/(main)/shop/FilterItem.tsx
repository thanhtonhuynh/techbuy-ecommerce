"use client";

import { SortFilterItem } from "@/constants";
import { cn, createUrl } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function FilterItem({ item }: { item: SortFilterItem }) {
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
    <li>
      <DynamicTag
        href={href}
        prefetch={!active ? false : undefined}
        className={cn(
          "select-none text-muted-foreground underline-offset-4 hover:underline",
          active && "font-semibold text-primary hover:no-underline",
        )}
      >
        {item.title}
      </DynamicTag>
    </li>
  );
}
