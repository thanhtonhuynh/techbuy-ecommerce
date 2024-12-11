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
import { Product } from "@/types";
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { deleteProductAction, updateProductStatusAction } from "./actions";

export function ProductActions({ product }: { product: Product }) {
  const isDesktop = useMediaQuery("(min-width: 768px)"); // <768px is sm
  const DynamicTag = isDesktop ? Dialog : Sheet;
  const [open, setOpen] = useState(false);

  return (
    <DynamicTag open={open} onOpenChange={setOpen}>
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

          <DropdownMenuItem asChild>
            <Button
              variant={"ghost"}
              className="w-full cursor-pointer justify-start px-2 text-destructive hover:text-destructive focus-visible:text-destructive focus-visible:ring-0"
              onClick={() => setOpen(true)}
            >
              Delete
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Put the dialog here so that when the Delete button is clicked, it wont close the dialog */}
      <DeleteDialogContent productId={product.id} isDesktop={isDesktop} setOpen={setOpen} />
    </DynamicTag>
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

function DeleteDialogContent({
  productId,
  isDesktop,
  setOpen,
}: {
  productId: string;
  isDesktop: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const title = "Are you absolutely sure?";
  const description = "This action cannot be undone. This will permanently delete the product.";

  async function handleConfirmDelete() {
    toast.promise(deleteProductAction(productId), {
      loading: "Deleting product...",
      success: "Product deleted",
      error: (error) => error.message,
    });
    setOpen(false);
  }

  if (isDesktop) {
    return (
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant={`outline`}>Cancel</Button>
          </DialogClose>

          <DialogClose asChild>
            <Button variant={`destructive`} onClick={handleConfirmDelete}>
              Yes, delete product
            </Button>
          </DialogClose>
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

        <SheetClose asChild>
          <Button variant={`destructive`} onClick={handleConfirmDelete}>
            Yes, delete product
          </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
}
