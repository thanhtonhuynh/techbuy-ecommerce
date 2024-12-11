"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Category } from "@prisma/client";
import { Ellipsis } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { deleteCategoryAction } from "./actions";
import { CategoryForm } from "./CategoryForm";

export function CategoryActions({ category }: { category: Category }) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)"); // <768px is sm
  const DynamicTag = isDesktop ? Dialog : Sheet;

  return (
    <DynamicTag open={editOpen || deleteOpen} onOpenChange={editOpen ? setEditOpen : setDeleteOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-haspopup="true" size="icon" variant="ghost">
            <Ellipsis className="size-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Button
              variant={"ghost"}
              className={"w-full cursor-pointer justify-start focus-visible:ring-0"}
              onClick={() => setEditOpen(true)}
            >
              Edit
            </Button>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Button
              variant={"ghost"}
              className="w-full cursor-pointer justify-start px-2 text-destructive hover:text-destructive focus-visible:text-destructive focus-visible:ring-0"
              onClick={() => setDeleteOpen(true)}
            >
              Delete
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {deleteOpen && (
        <DeleteContent
          categoryId={category.id}
          setDeleteOpen={setDeleteOpen}
          isDesktop={isDesktop}
        />
      )}

      {editOpen && (
        <EditContent category={category} setEditOpen={setEditOpen} isDesktop={isDesktop} />
      )}
    </DynamicTag>
  );
}

function DeleteContent({
  categoryId,
  setDeleteOpen,
  isDesktop,
}: {
  categoryId: string;
  setDeleteOpen: Dispatch<SetStateAction<boolean>>;
  isDesktop: boolean;
}) {
  const title = "Are you absolutely sure?";
  const description = "This action cannot be undone. This will permanently delete the category.";

  async function handleConfirmDelete() {
    toast.promise(deleteCategoryAction(categoryId), {
      loading: "Deleting category...",
      success: "Category deleted",
      error: (error) => error.message,
    });
    setDeleteOpen(false);
  }

  if (isDesktop) {
    return (
      <DialogContent className="sm:max-w-max">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant={`outline`}>Cancel</Button>
          </DialogClose>

          <Button variant={`destructive`} onClick={handleConfirmDelete}>
            Yes, delete category
          </Button>
        </DialogFooter>
      </DialogContent>
    );
  }

  return (
    <SheetContent side={`bottom`} className="rounded-t-xl">
      <SheetHeader className="mb-2 px-4 text-left">
        <SheetTitle>{title}</SheetTitle>
        <SheetDescription>{description}</SheetDescription>
      </SheetHeader>

      <SheetFooter className="gap-2 px-4 pt-2">
        <SheetClose asChild>
          <Button variant={`outline`}>Cancel</Button>
        </SheetClose>

        <Button variant={`destructive`} onClick={handleConfirmDelete}>
          Yes, delete category
        </Button>
      </SheetFooter>
    </SheetContent>
  );
}

function EditContent({
  category,
  setEditOpen,
  isDesktop,
}: {
  category: Category;
  setEditOpen: Dispatch<SetStateAction<boolean>>;
  isDesktop: boolean;
}) {
  const title = "Edit category";

  if (isDesktop) {
    return (
      <DialogContent className="gap-2">
        <DialogHeader className="mb-2">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <CategoryForm setOpen={setEditOpen} category={category} />

        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
      </DialogContent>
    );
  }

  return (
    <SheetContent side={`bottom`} className="rounded-t-xl">
      <SheetHeader className="mb-2 px-4 text-left">
        <SheetTitle>{title}</SheetTitle>
        <SheetDescription aria-describedby="edit-category-description" />
      </SheetHeader>

      <CategoryForm className="px-4" setOpen={setEditOpen} category={category} />

      <SheetFooter className="px-4 pt-2">
        <SheetClose asChild>
          <Button variant="outline">Cancel</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
}
