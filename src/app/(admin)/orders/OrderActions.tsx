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
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Order } from "@/types";
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction, useState } from "react";
import { DeliveryStatusForm } from "./DeliveryStatusForm";

export function OrderActions({ order }: { order: Order }) {
  const isDesktop = useMediaQuery("(min-width: 768px)"); // <768px is sm
  const DynamicTag = isDesktop ? Dialog : Drawer;
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
    <DrawerContent onClick={(e) => e.stopPropagation()}>
      <DrawerHeader className="text-left">
        <DrawerTitle>{title}</DrawerTitle>
      </DrawerHeader>

      <DeliveryStatusForm className="px-4" setOpen={setOpen} order={order} />

      <DrawerFooter className="pt-2">
        <DrawerClose asChild>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
}
