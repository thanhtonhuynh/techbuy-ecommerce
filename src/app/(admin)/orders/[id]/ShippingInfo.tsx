import { Order } from "@/types";

export function ShippingInfo({ order }: { order: Order }) {
  return (
    <>
      <div className="flex justify-between">
        <span className="font-medium">Full name</span>
        <span>{order.shipping?.name}</span>
      </div>

      <div className="flex justify-between">
        <span className="font-medium">Phone number</span>
        <span>{order.phone}</span>
      </div>

      <div className="flex justify-between">
        <span className="font-medium">Address</span>
        {order.shipping && (
          <div className="flex gap-2">
            <span>{order.shipping.line2}</span>
            <span>{order.shipping.line1}</span>
            <span>{order.shipping.city}</span>
            <span>{order.shipping.state}</span>
            <span>{order.shipping.postalCode}</span>
            <span>{order.shipping.country}</span>
          </div>
        )}
      </div>
    </>
  );
}
