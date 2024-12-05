import { OrderItemList } from "@/components/OrderItemList";
import { formatPriceFull } from "@/lib/utils";
import { Order } from "@/types";
import { CustomerInfo } from "./CustomerInfo";
import { OrderInfo } from "./OrderInfo";
import { ShippingInfo } from "./ShippingInfo";

export function OrderDetails({ order }: { order: Order }) {
  return (
    <>
      <section className="space-y-2">
        <h2>Order Information</h2>

        <div className="space-y-1">
          <OrderInfo order={order} />
        </div>
      </section>

      <section className="space-y-2">
        <h2>Customer Information</h2>

        <div className="space-y-1">
          <CustomerInfo order={order} />
        </div>
      </section>

      <section className="space-y-2">
        <h2>Shipping Information</h2>

        <div className="space-y-1">
          <ShippingInfo order={order} />
        </div>
      </section>

      <section>
        <h2>Order Summary</h2>

        <OrderItemList list={order.items} />

        <div className="space-y-1 py-4">
          <p className="flex justify-between">
            <span className="font-medium">Subtotal</span>
            <span>{formatPriceFull(order.totalAmount / 100)}</span>
          </p>

          <p className="flex justify-between">
            <span className="font-medium">Shipping</span>
            <span>Free</span>
          </p>

          <p className="flex justify-between">
            <span className="font-medium">Tax</span>
            <span>{formatPriceFull((order.totalAmount * 0.12) / 100)}</span>
          </p>

          <p className="flex justify-between">
            <span className="font-bold">Total</span>
            <span>{formatPriceFull((order.totalAmount * 1.12) / 100)}</span>
          </p>
        </div>
      </section>
    </>
  );
}
