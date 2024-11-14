import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Cart } from "@/types";
import { ShoppingCart } from "lucide-react";

type CartSheetProps = {
  cart: Cart | null;
};

export function CartSheet({ cart }: CartSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size={`sm`} className="relative">
          <ShoppingCart />
          {cart && cart.totalQuantity > 0 && (
            <span
              className={`absolute right-0 top-0 -mr-2 -mt-2 rounded bg-blue-600 px-1 py-[1px] text-xs font-semibold text-white`}
            >
              {cart.totalQuantity}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="backdrop-blur">
        <SheetHeader>
          <SheetTitle>My Cart</SheetTitle>
        </SheetHeader>

        {cart ? (
          <>
            <p>
              You have {cart.totalQuantity} item{cart.totalQuantity > 1 && "s"}{" "}
              in your cart.
            </p>
            <p>Total: ${cart.totalAmount.toFixed(2)}</p>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}

        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Proceed to Checkout</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
