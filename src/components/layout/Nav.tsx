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
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import { Menu } from "lucide-react";
import Link from "next/link";
import { ComponentProps, useEffect, useState } from "react";

export function NavLink({ className, ...props }: ComponentProps<typeof Link>) {
  const isMobile = useMediaQuery(`(max-width: 767px)`);

  return (
    <li>
      <Button
        asChild
        variant={`link`}
        className={cn(
          "px-2 font-normal text-muted-foreground transition-colors hover:text-blue-600",
          isMobile && "h-full w-full justify-start rounded-none border-b py-4 text-primary",
          className,
        )}
      >
        <Link {...props} className={cn("hover:no-underline")} />
      </Button>
    </li>
  );
}

export function DesktopNav({ categories }: { categories: Category[] }) {
  return (
    <nav className="hidden md:block">
      <ul className="flex flex-row space-x-2">
        <NavLink href={`/shop`}>All</NavLink>
        {categories.map((category) => (
          <NavLink key={category.id} href={`/shop/${category.slug}`}>
            {category.name}
          </NavLink>
        ))}
      </ul>
    </nav>
  );
}

export function MobileNav({ categories }: { categories: Category[] }) {
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
              <NavLink href={`/shop`}>All</NavLink>
            </DrawerClose>
            {categories.map((category) => (
              <DrawerClose asChild key={category.id}>
                <NavLink href={`/shop/${category.slug}`}>{category.name}</NavLink>
              </DrawerClose>
            ))}
          </ul>
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
