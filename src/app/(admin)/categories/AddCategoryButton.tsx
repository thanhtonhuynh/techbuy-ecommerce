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
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";
import { DialogClose } from "@radix-ui/react-dialog";
import { useState } from "react";
import { CategoryForm } from "./CategoryForm";

export function AddCategoryButton() {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)"); // <768px is sm

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"outline"}>Add Category</Button>
        </DialogTrigger>

        <DialogContent className="gap-2">
          <DialogHeader className="mb-2">
            <DialogTitle>Add category</DialogTitle>
          </DialogHeader>

          <CategoryForm setOpen={setOpen} />

          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant={"outline"}>Add Category</Button>
      </SheetTrigger>

      <SheetContent side="bottom" className="rounded-t-xl">
        <SheetHeader className="mb-2 px-4 text-left">
          <SheetTitle>Add category</SheetTitle>
          <SheetDescription aria-describedby="add-category-description" />
        </SheetHeader>

        <CategoryForm className="px-4" setOpen={setOpen} />

        <SheetFooter className="px-4 pt-2">
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
