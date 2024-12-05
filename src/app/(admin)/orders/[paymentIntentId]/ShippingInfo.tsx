import { Order } from "@/types";

export function ShippingInfo({ order }: { order: Order }) {
  return (
    <>
      <p className="flex justify-between">
        <span>Full name</span>
        <span>{order.shipping?.name}</span>
      </p>

      <p className="flex justify-between">
        <span>Phone number</span>
        <span>{order.phone}</span>
      </p>

      <div className="flex justify-between">
        <span>Address</span>
        {order.shipping && (
          <p className="flex gap-2">
            <span>{order.shipping.line2}</span>
            <span>{order.shipping.line1}</span>
            <span>{order.shipping.city}</span>
            <span>{order.shipping.state}</span>
            <span>{order.shipping.postalCode}</span>
            <span>{order.shipping.country}</span>
          </p>
        )}
      </div>
    </>
  );
}
