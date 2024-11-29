"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import { useState } from "react";
import { CategoryForm } from "./CategoryForm";

export function AddOrEditCategoryButton({ category }: { category?: Category }) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)"); // <768px is sm

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant={category ? "ghost" : "outline"}
            className={cn(category && "w-full justify-start px-2")}
          >
            {category ? "Edit" : "Add Category"}
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{category ? "Edit" : "Add"} category</DialogTitle>
          </DialogHeader>

          <CategoryForm setOpen={setOpen} category={category} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant={category ? "ghost" : "outline"}
          className={cn(category && "w-full justify-start px-2")}
        >
          {category ? "Edit" : "Add Category"}
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{category ? "Edit" : "Add"} category</DrawerTitle>
        </DrawerHeader>

        <CategoryForm className="px-4" setOpen={setOpen} category={category} />

        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
