import { Order } from "@/types";
import moment from "moment";
import { DeliveryStatusBadge, PaymentStatusBadge } from "../StatusBadge";

export function OrderInfo({ order }: { order: Order }) {
  return (
    <>
      <p className="flex justify-between">
        <span>Payment intent ID</span>
        <span>{order.paymentIntentId}</span>
      </p>

      <p className="flex justify-between">
        <span>Order ID</span>
        <span>{order.id}</span>
      </p>

      <p className="flex justify-between">
        <span>Placed at</span>
        <span>{moment(order.createdAt).format("MMM DD, YYYY HH:mm:ss")}</span>
      </p>

      <p className="flex justify-between">
        <span>Last updated at</span>
        <span>{moment(order.updatedAt).format("MMM DD, YYYY HH:mm:ss")}</span>
      </p>

      <div className="flex items-center justify-between">
        <span>Payment status</span>
        <PaymentStatusBadge status={order.paymentStatus} />
      </div>

      <div className="flex items-center justify-between">
        <span>Delivery status</span>
        <DeliveryStatusBadge status={order.deliveryStatus} />
      </div>
    </>
  );
}
