import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { formatPrice } from "@/lib/utils";
import { Cart } from "@/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { EditItemQuantityButton } from "./EditItemQuantityButton";

type CartSheetProps = {
  cart: Cart | null;
};

export function CartSheet({ cart }: CartSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size={`icon`}
          className="relative rounded-full"
        >
          <ShoppingCart />
          {cart && cart.totalQuantity > 0 && (
            <span
              className={`absolute right-0 top-0 -mr-[5px] -mt-[5px] rounded bg-blue-600 px-1 py-[1px] text-xs font-semibold text-white`}
            >
              {cart.totalQuantity}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="flex w-full flex-col justify-between bg-background/80 backdrop-blur-xl sm:max-w-[540px]">
        <div>
          <SheetHeader>
            <SheetTitle>My Cart</SheetTitle>
            <SheetDescription />
          </SheetHeader>

          {!cart || cart.items.length === 0 ? (
            <div className="mt-16 flex flex-col items-center space-y-4 text-xl font-bold">
              <ShoppingCart className="h-12 w-12" />
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <ul>
              {cart.items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-2 border-b px-1 py-4"
                >
                  <div className="flex flex-1 flex-row items-center gap-2">
                    <div className="h-16 w-16 rounded-md border">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        width={64}
                        height={64}
                        className="aspect-square h-full w-full rounded-md object-cover"
                      />
                    </div>

                    <Link
                      href={`/product/${item.product.id}`}
                      className="flex flex-1 flex-col justify-center self-stretch"
                    >
                      <span className="font-medium">{item.product.name}</span>
                      <p className="text-sm text-muted-foreground">
                        {formatPrice(item.product.price / 100)}
                      </p>
                    </Link>
                  </div>

                  <div className="flex items-center gap-2 rounded-full border text-sm dark:border-primary/30">
                    <EditItemQuantityButton item={item} type="minus" />
                    <p className="font-medium">{item.quantity}</p>
                    <EditItemQuantityButton item={item} type="plus" />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart && cart.items.length > 0 && (
          <SheetClose asChild>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-600/90">
              Proceed to Checkout
            </Button>
          </SheetClose>
        )}
      </SheetContent>
    </Sheet>
  );
}
