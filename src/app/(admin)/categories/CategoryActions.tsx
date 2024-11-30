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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Category } from "@prisma/client";
import { Ellipsis } from "lucide-react";
import { toast } from "sonner";
import { deleteCategoryAction } from "./actions";
import { AddOrEditCategoryButton } from "./AddOrEditCategoryButton";

export function CategoryActions({ category }: { category: Category }) {
  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-haspopup="true" size="icon" variant="ghost">
            <Ellipsis className="size-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <AddOrEditCategoryButton category={category} />
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DeleteDropdownItem />
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteDialogContent categoryId={category.id} />
    </Dialog>
  );
}

function DeleteDropdownItem() {
  return (
    <DialogTrigger asChild>
      <DropdownMenuItem asChild>
        <Button
          variant={"ghost"}
          className="w-full cursor-pointer justify-start px-2 text-destructive hover:text-destructive focus-visible:text-destructive focus-visible:ring-0"
        >
          Delete
        </Button>
      </DropdownMenuItem>
    </DialogTrigger>
  );
}

function DeleteDialogContent({ categoryId }: { categoryId: string }) {
  return (
    <DialogContent className="sm:max-w-max">
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>

        <DialogDescription>
          This action cannot be undone. This will permanently delete the category.
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant={`outline`}>Cancel</Button>
        </DialogClose>

        <DialogClose asChild>
          <Button
            variant={`destructive`}
            onClick={async () => {
              toast.promise(deleteCategoryAction(categoryId), {
                loading: "Deleting category...",
                success: "Category deleted",
                error: (error) => error.message,
              });
            }}
          >
            Yes, delete category
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
