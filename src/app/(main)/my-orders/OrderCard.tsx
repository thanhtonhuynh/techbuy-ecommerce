import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { formatPriceFull } from "@/lib/utils";
import { Order } from "@/types";
import moment from "moment";
import Link from "next/link";
import { OrderItemList } from "../../../components/OrderItemList";

export function OrderCard({ order }: { order: Order }) {
  return (
    <Card>
      <CardHeader className="flex-row justify-between gap-4 space-y-0 rounded-t-xl bg-muted text-sm">
        <div className="flex gap-8">
          <div>
            <p>Order placed</p>
            <p className="font-semibold">{moment(order.createdAt).format("MMM DD, YYYY")}</p>
          </div>

          <div>
            <p>Total paid</p>
            <p className="font-semibold">{formatPriceFull(order.totalAmount / 100)}</p>
          </div>

          <div>
            <p>Ship to</p>
            <p className="font-semibold">{order.shipping?.name}</p>
          </div>
        </div>

        <div>
          <p>Order #</p>
          <p className="font-semibold tracking-tighter">{order.paymentIntentId}</p>
        </div>
      </CardHeader>

      <CardContent className="">
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
