"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "../layout/Nav";

export function DesktopNav() {
  return (
    <nav className="hidden md:block">
      <ul className="flex flex-row space-x-2">
        <NavLink href={`/dashboard`}>Dashboard</NavLink>
        <NavLink href={`/products`}>Products</NavLink>
        <NavLink href={`/orders`}>Orders</NavLink>
        <NavLink href={`/categories`}>Categories</NavLink>
      </ul>
    </nav>
  );
}

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery(`(min-width: 768px)`);

  useEffect(() => {
    if (isDesktop) {
      setOpen(false);
    }
  }, [isDesktop]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant={`link`} size={`icon`}>
          <Menu className="size-4" />
        </Button>
      </SheetTrigger>

      <SheetContent side={`bottom`} className="rounded-t-xl">
        <SheetTitle aria-label="menu" />
        <SheetDescription aria-describedby="navigation" />

        <nav className="px-2">
          <ul className="flex flex-col">
            <SheetClose asChild>
              <NavLink href={`/dashboard`}>Dashboard</NavLink>
            </SheetClose>

            <SheetClose asChild>
              <NavLink href={`/products`}>Products</NavLink>
            </SheetClose>

            <SheetClose asChild>
              <NavLink href={`/orders`}>Orders</NavLink>
            </SheetClose>

            <SheetClose asChild>
              <NavLink href={`/categories`}>Categories</NavLink>
            </SheetClose>
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
