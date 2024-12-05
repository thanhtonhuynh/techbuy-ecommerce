import { Order } from "@/types";
import moment from "moment";
import { DeliveryStatusBadge, PaymentStatusBadge } from "../StatusBadge";

export function OrderInfo({ order }: { order: Order }) {
  return (
    <>
      <div className="flex justify-between">
        <span className="font-medium">Order ID</span>
        <span>{order.id}</span>
      </div>

      <div className="flex justify-between">
        <span className="font-medium">Payment intent ID</span>
        <span>{order.paymentIntentId}</span>
      </div>

      <div className="flex justify-between">
        <span className="font-medium">Placed at</span>
        <span>{moment(order.createdAt).format("MMM DD, YYYY HH:mm:ss")}</span>
      </div>

      <div className="flex justify-between">
        <span className="font-medium">Last updated at</span>
        <span>{moment(order.updatedAt).format("MMM DD, YYYY HH:mm:ss")}</span>
      </div>

      <div className="flex items-center justify-between">
        <span className="font-medium">Payment status</span>
        <PaymentStatusBadge status={order.paymentStatus} />
      </div>

      <div className="flex items-center justify-between">
        <span className="font-medium">Delivery status</span>
        <DeliveryStatusBadge status={order.deliveryStatus} />
      </div>
    </>
  );
}
