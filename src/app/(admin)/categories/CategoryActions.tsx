"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
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

        <DeleteDropdownItem categoryId={category.id} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function DeleteDropdownItem({ categoryId }: { categoryId: string }) {
  return (
    <DropdownMenuItem asChild>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant={"ghost"}
            className="w-full cursor-pointer justify-start px-2 text-destructive hover:text-destructive focus-visible:text-destructive focus-visible:ring-0"
          >
            Delete
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
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
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DropdownMenuItem>
  );
}
