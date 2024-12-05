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
import { Product } from "@/types";
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { deleteProductAction, updateProductStatusAction } from "./actions";

export function ProductActions({ product }: { product: Product }) {
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
            <Link href={`/product/${product.slug}`} className="cursor-pointer font-medium">
              View
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href={`/products/${product.slug}/edit`} className="cursor-pointer font-medium">
              Edit
            </Link>
          </DropdownMenuItem>

          <ActivateDropdownItem productId={product.id} />

          <DeactivateDropdownItem productId={product.id} />

          <DraftDropdownItem productId={product.id} />

          <ArchiveDropdownItem productId={product.id} />

          <DropdownMenuSeparator />

          <DeleteDropdownItem />
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Put the dialog here so that when the Delete button is clicked, it wont close the dialog */}
      <DeleteDialogContent productId={product.id} />
    </Dialog>
  );
}

function ActivateDropdownItem({ productId }: { productId: string }) {
  return (
    <DropdownMenuItem asChild>
      <Button
        onClick={async () => {
          toast.promise(updateProductStatusAction(productId, "active"), {
            loading: "Activating product...",
            success: "Product activated",
            error: (error) => error.message,
          });
        }}
        className="w-full cursor-pointer justify-start focus-visible:ring-0"
        variant={"ghost"}
      >
        Activate
      </Button>
    </DropdownMenuItem>
  );
}

function DeactivateDropdownItem({ productId }: { productId: string }) {
  return (
    <DropdownMenuItem asChild>
      <Button
        onClick={async () => {
          toast.promise(updateProductStatusAction(productId, "unavailable"), {
            loading: "Deactivating product...",
            success: "Product deactivated",
            error: (error) => error.message,
          });
        }}
        className="w-full cursor-pointer justify-start focus-visible:ring-0"
        variant={"ghost"}
      >
        Mark as unavailable
      </Button>
    </DropdownMenuItem>
  );
}

function DraftDropdownItem({ productId }: { productId: string }) {
  return (
    <DropdownMenuItem asChild>
      <Button
        onClick={async () => {
          toast.promise(updateProductStatusAction(productId, "draft"), {
            loading: "Marking product as draft...",
            success: "Product marked as draft",
            error: (error) => error.message,
          });
        }}
        className="w-full cursor-pointer justify-start focus-visible:ring-0"
        variant={"ghost"}
      >
        Mark as draft
      </Button>
    </DropdownMenuItem>
  );
}

function ArchiveDropdownItem({ productId }: { productId: string }) {
  return (
    <DropdownMenuItem asChild>
      <Button
        onClick={async () => {
          toast.promise(updateProductStatusAction(productId, "archived"), {
            loading: "Archiving product...",
            success: "Product archived",
            error: (error) => error.message,
          });
        }}
        className="w-full cursor-pointer justify-start focus-visible:ring-0"
        variant={"ghost"}
      >
        Archive product
      </Button>
    </DropdownMenuItem>
  );
}

function DeleteDropdownItem() {
  return (
    <DropdownMenuItem asChild>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="w-full cursor-pointer justify-start px-2 py-1 text-destructive hover:text-destructive focus-visible:text-destructive focus-visible:ring-0"
        >
          Delete
        </Button>
      </DialogTrigger>
    </DropdownMenuItem>
  );
}

function DeleteDialogContent({ productId }: { productId: string }) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>

        <DialogDescription>
          This action cannot be undone. This will permanently delete the product.
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
              toast.promise(deleteProductAction(productId), {
                loading: "Deleting product...",
                success: "Product deleted",
                error: (error) => error.message,
              });
            }}
          >
            Yes, delete product
          </Button>
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
}
