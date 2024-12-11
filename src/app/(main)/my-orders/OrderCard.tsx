import { OrderItemList } from "@/components/order/OrderItemList";
import { DeliveryStatusBadge } from "@/components/order/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { formatPriceFull } from "@/lib/utils";
import { Order } from "@/types";
import { ChevronDown } from "lucide-react";
import moment from "moment";
import Link from "next/link";

export function OrderCard({ order }: { order: Order }) {
  return (
    <Card>
      <CardHeader className="justify-between gap-4 space-y-0 rounded-t-xl bg-muted text-sm md:flex-row md:items-center">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <div className="flex items-center justify-between gap-8">
            <div>
              <p className="text-muted-foreground">Order placed</p>
              <p className="font-semibold">{moment(order.createdAt).format("MMM DD, YYYY")}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Total paid</p>
              <p className="font-semibold">{formatPriceFull(order.totalAmount / 100)}</p>
            </div>
          </div>

          <div>
            <p className="text-muted-foreground">Ship to</p>
            <Popover>
              <PopoverTrigger className="flex items-center gap-1 font-semibold data-[state=closed]:hover:text-blue-500">
                {order.shipping?.name}
                <ChevronDown className="size-4" />
              </PopoverTrigger>
              <PopoverContent className="w-fit text-sm">
                <p className="font-semibold">{order.shipping?.name}</p>
                <p>
                  {order.shipping?.line2}-{order.shipping?.line1}
                </p>
                <p>
                  {order.shipping?.city} {order.shipping?.state} {order.shipping?.country}{" "}
                  {order.shipping?.postalCode}
                </p>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex items-center justify-between gap-8">
          <div>
            <p className="text-muted-foreground">Order #</p>
            <p className="font-semibold tracking-tighter">{order.paymentIntentId}</p>
          </div>

          <DeliveryStatusBadge status={order.deliveryStatus} />
        </div>
      </CardHeader>

      <CardContent className="pt-4">
        <OrderItemList list={order.items} />
      </CardContent>

      <CardFooter className="justify-end py-2">
        <Button asChild variant={`link`} className="text-blue-500">
          <Link href={`/my-orders/${order.paymentIntentId}`}>View order details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
