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
        {/* <DropdownMenuItem>Edit</DropdownMenuItem> */}

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
      <Button
        onClick={async () => {
          toast.promise(deleteProductAction(productId), {
            loading: "Deleting product...",
            success: "Product deleted",
            error: (error) => error.message,
          });
        }}
        className="w-full cursor-pointer justify-start text-destructive focus-visible:text-destructive focus-visible:ring-0"
        variant={"ghost"}
      >
        Delete
      </Button>
    </DropdownMenuItem>
  );
}
