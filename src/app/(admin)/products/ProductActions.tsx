import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Product } from "@prisma/client";
import { Ellipsis } from "lucide-react";
import { toast } from "sonner";
import { deleteProductAction } from "./actions";

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
        <DropdownMenuItem>Edit</DropdownMenuItem>

        <DeleteDropdownItem productId={product.id} />
      </DropdownMenuContent>
    </DropdownMenu>
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
        className="w-full cursor-pointer justify-start"
        variant={"ghost"}
      >
        Delete
      </Button>
    </DropdownMenuItem>
  );
}
