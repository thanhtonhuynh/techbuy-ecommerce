import { OrderItems } from "@/components/order/OrderItems";
import { OrderSummary } from "@/components/order/OrderSummary";
import { ShippingInfo } from "@/components/order/ShippingInfo";
import { DeliveryStatusBadge } from "@/components/order/StatusBadge";
import { Card } from "@/components/ui/card";
import { Order } from "@/types";
import moment from "moment";

export function OrderDetails({ order }: { order: Order }) {
  return (
    <Card className="space-y-4 p-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2>
            <p className="text-sm font-normal text-muted-foreground">Order #</p>
            <p className="text-xl">{order.paymentIntentId}</p>
          </h2>

          <DeliveryStatusBadge status={order.deliveryStatus} />
        </div>

        <p className="text-sm text-muted-foreground">
          <span>Order placed on </span>
          <span className="font-medium">
            {moment(order.createdAt).format("MMM DD, YYYY HH:mm")}
          </span>
        </p>
      </div>

      <ShippingInfo order={order} />

      <OrderItems order={order} />

      <OrderSummary order={order} />
    </Card>
  );
}
