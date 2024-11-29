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
import { Product } from "@prisma/client";
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { deleteProductAction, updateProductStatusAction } from "./actions";

export function ProductActions({ product }: { product: Product }) {
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
          <Link href={`/products/${product.id}/edit`} className="cursor-pointer font-medium">
            Edit
          </Link>
        </DropdownMenuItem>

        <ActivateDropdownItem productId={product.id} />

        <DeactivateDropdownItem productId={product.id} />

        <DraftDropdownItem productId={product.id} />

        <ArchiveDropdownItem productId={product.id} />

        <DropdownMenuSeparator />

        <DeleteDropdownItem productId={product.id} />
      </DropdownMenuContent>
    </DropdownMenu>
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

function DeleteDropdownItem({ productId }: { productId: string }) {
  return (
    <DropdownMenuItem asChild>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant={"ghost"}
            className="w-full cursor-pointer justify-start px-2 py-1 text-destructive hover:text-destructive focus-visible:text-destructive focus-visible:ring-0"
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
                toast.promise(deleteProductAction(productId), {
                  loading: "Deleting product...",
                  success: "Product deleted",
                  error: (error) => error.message,
                });
              }}
            >
              Yes, delete product
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </DropdownMenuItem>
  );
}
