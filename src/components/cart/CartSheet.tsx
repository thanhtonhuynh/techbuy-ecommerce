"use client";

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
import { formatPriceFull } from "@/lib/utils";
import { useCart } from "@/providers/CartProvider";
import { useSession } from "@/providers/SessionProvider";
import { Loader2, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { ClearCartButton } from "./ClearCartButton";
import { EditItemQuantityButton } from "./EditItemQuantityButton";
import { RemoveItemButton } from "./RemoveItemButton";
import { redirectToCheckoutAction } from "./actions";

export function CartSheet() {
  const { user } = useSession();
  const { optimisticCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(optimisticCart?.totalQuantity);

  useEffect(() => {
    if (
      optimisticCart &&
      optimisticCart.totalQuantity !== quantityRef.current &&
      optimisticCart.totalQuantity > 0
    ) {
      if (!isOpen) setIsOpen(true);
    }
    quantityRef.current = optimisticCart?.totalQuantity;
  }, [isOpen, optimisticCart, optimisticCart?.totalQuantity]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size={`icon`} className="relative rounded-full">
          <ShoppingCart size={16} />
          {optimisticCart && optimisticCart.totalQuantity > 0 && (
            <span
              className={`absolute right-0 top-0 -mr-[5px] -mt-[5px] rounded bg-blue-600 px-1 py-[1px] text-xs font-semibold text-white`}
            >
              {optimisticCart.totalQuantity}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent overlay={`blur`} className="flex w-full flex-col justify-between">
        <div>
          <SheetHeader>
            <SheetTitle>My Cart</SheetTitle>
            <SheetDescription />
          </SheetHeader>

          {!optimisticCart || optimisticCart.items.length === 0 ? (
            <div className="mt-16 flex flex-col items-center space-y-4 text-xl font-bold">
              <ShoppingCart className="h-12 w-12" />
              <p>Your cart is empty.</p>
            </div>
          ) : (
            <>
              <ul className="mb-2">
                {optimisticCart.items
                  .sort((a, b) => a.product.name.localeCompare(b.product.name))
                  .map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between gap-2 border-b px-1 py-4"
                    >
                      <div className="relative flex flex-1 flex-row items-center gap-2">
                        <div className="absolute top-0 -ml-3 -mt-3">
                          <RemoveItemButton item={item} />
                        </div>

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
                            {formatPriceFull(item.totalAmount / 100)}
                          </p>
                        </Link>
                      </div>

                      <div className="flex items-center gap-1 rounded-full border text-sm dark:border-primary/30">
                        <EditItemQuantityButton item={item} type="minus" />
                        <p className="w-5 text-center font-medium">{item.quantity}</p>
                        <EditItemQuantityButton item={item} type="plus" />
                      </div>
                    </li>
                  ))}
              </ul>

              <ClearCartButton />
            </>
          )}
        </div>

        {optimisticCart && optimisticCart.items.length > 0 && (
          <>
            {user ? (
              <form action={redirectToCheckoutAction}>
                <CheckoutButton />
              </form>
            ) : (
              <SheetClose asChild>
                <Button type="submit" variant={`outline`} asChild>
                  <Link href="/login">Login to Checkout</Link>
                </Button>
              </SheetClose>
            )}
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function CheckoutButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full bg-blue-600 hover:bg-blue-600/90" type="submit" disabled={pending}>
      {pending ? (
        <span className="flex items-center gap-2">
          <Loader2 size={15} className="animate-spin" />
          Please wait...
        </span>
      ) : (
        "Proceed to Checkout"
      )}
    </Button>
  );
}
