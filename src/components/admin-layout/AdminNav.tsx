"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
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
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild className="md:hidden">
        <Button variant={`link`} size={`icon`}>
          <Menu className="size-4" />
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle aria-label="menu" />
          <DrawerDescription aria-describedby="navigation" />
        </DrawerHeader>

        <nav className="px-4 pb-8">
          <ul className="flex flex-col">
            <DrawerClose asChild>
              <NavLink href={`/dashboard`}>Dashboard</NavLink>
            </DrawerClose>

            <DrawerClose asChild>
              <NavLink href={`/products`}>Products</NavLink>
            </DrawerClose>

            <DrawerClose asChild>
              <NavLink href={`/orders`}>Orders</NavLink>
            </DrawerClose>

            <DrawerClose asChild>
              <NavLink href={`/categories`}>Categories</NavLink>
            </DrawerClose>
          </ul>
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
