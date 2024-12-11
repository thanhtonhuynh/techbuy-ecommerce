"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
import { Order } from "@/types";
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { DeliveryStatusForm } from "./DeliveryStatusForm";

export function OrderActions({ order }: { order: Order }) {
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
            <Link href={`/orders/${order.paymentIntentId}`} className="cursor-pointer font-medium">
              View order details
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Button
              variant={"ghost"}
              className={"w-full cursor-pointer justify-start focus-visible:ring-0"}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(true);
              }}
            >
              Update delivery status
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UpdateDeliveryStatusContent order={order} setOpen={setOpen} isDesktop={isDesktop} />
    </DynamicTag>
  );
}

function UpdateDeliveryStatusContent({
  order,
  setOpen,
  isDesktop,
}: {
  order: Order;
  setOpen: Dispatch<SetStateAction<boolean>>;
  isDesktop: boolean;
}) {
  const title = "Update delivery status";

  if (isDesktop) {
    return (
      <DialogContent className="gap-2" onClick={(e) => e.stopPropagation()}>
        <DialogHeader className="mb-2">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <DeliveryStatusForm setOpen={setOpen} order={order} />

        <DialogClose asChild>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
      </DialogContent>
    );
  }

  return (
    <SheetContent side={`bottom`} className="rounded-t-xl" onClick={(e) => e.stopPropagation()}>
      <SheetHeader className="mb-2 px-4 text-left">
        <SheetTitle>{title}</SheetTitle>
        <SheetDescription aria-describedby="update-delivery-status-description" />
      </SheetHeader>

      <DeliveryStatusForm className="px-4" setOpen={setOpen} order={order} />

      <SheetFooter className="px-4 pt-2">
        <SheetClose asChild>
          <Button variant="outline">Cancel</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
}
