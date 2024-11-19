"use client";

import { SortFilterItem } from "@/constants";
import { cn, createUrl } from "@/lib/utils";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function FilterItem({ item }: { item: SortFilterItem }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get("sort") === item.slug;
  const q = searchParams.get("q");
  const href = createUrl(
    pathname,
    new URLSearchParams({
      ...(q && { q }),
      ...(item.slug && item.slug.length && { sort: item.slug }),
    }),
  );
  const DynamicTag = active ? "p" : Link;

  return (
    <li>
      <DynamicTag
        href={href}
        prefetch={!active ? false : undefined}
        className={cn("select-none underline-offset-4 hover:underline", active && "underline")}
      >
        {item.title}
      </DynamicTag>
    </li>
  );
}
