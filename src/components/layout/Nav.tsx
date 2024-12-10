"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import { Menu } from "lucide-react";
import Link from "next/link";
import { ComponentProps, useState } from "react";

function NavLink({ className, onClick, ...props }: ComponentProps<typeof Link>) {
  const isMobile = useMediaQuery(`(max-width: 1024px)`);

  return (
    <Button
      asChild
      variant={`link`}
      className={cn(
        "px-2 font-normal text-muted-foreground transition-colors hover:text-blue-600",
        isMobile && "h-full justify-start rounded-none border-b py-4 text-primary",
        className,
      )}
    >
      <Link {...props} className={cn("hover:no-underline")} onClick={onClick} />
    </Button>
  );
}

export function DesktopNav({ categories }: { categories: Category[] }) {
  return (
    <nav className="hidden lg:block">
      <ul className="space-x-2">
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

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild className="lg:hidden">
        <Button variant={`link`} size={`icon`}>
          <Menu className="size-4" />
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>
        </DrawerHeader>

        <nav className="px-4 pb-8">
          <ul className="flex flex-col">
            <NavLink href={`/shop`} onClick={() => setOpen(false)}>
              All
            </NavLink>
            {categories.map((category) => (
              <NavLink
                key={category.id}
                href={`/shop/${category.slug}`}
                onClick={() => setOpen(false)}
              >
                {category.name}
              </NavLink>
            ))}
          </ul>
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
