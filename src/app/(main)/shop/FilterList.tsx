"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SortFilterItem } from "@/constants";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FilterItem } from "./FilterItem";

export function FilterList({ list }: { list: SortFilterItem[] }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort");
  const title = list.find((item) => item.slug === sort)?.title || "Sort";

  useEffect(() => {
    if (isDesktop) {
      setOpen(false);
    }
  }, [isDesktop]);

  if (isDesktop) {
    return (
      <nav className="space-y-1">
        <ul className="flex space-x-4">
          {list.map((item, i) => (
            <FilterItem key={i} item={item} />
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant={`outline`}>
          <ArrowUpDown className="size-4" />
          {title}
          <ChevronDown className="size-4" />
        </Button>
      </SheetTrigger>

      <SheetContent side={`bottom`} className="rounded-t-xl">
        <SheetTitle className="mb-2 px-6">Sort</SheetTitle>
        <SheetDescription aria-describedby="navigation" />

        <nav className="px-2">
          <ul className="">
            {list.map((item, i) => (
              <FilterItem key={i} item={item} onClick={() => setOpen(false)} />
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
