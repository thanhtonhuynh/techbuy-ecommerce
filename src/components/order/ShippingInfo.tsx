import { Order } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function ShippingInfo({ order }: { order: Order }) {
  return (
    <Card className="text-sm">
      <CardHeader className="p-4 text-base">
        <CardTitle>Shipping information</CardTitle>
      </CardHeader>

      <CardContent className="space-y-1 p-4 pt-0">
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
            <p className="flex gap-1">
              <span>{order.shipping.line2}</span>
              <span>{order.shipping.line1}</span>
              <span>{order.shipping.city}</span>
              <span>{order.shipping.state}</span>
              <span>{order.shipping.postalCode}</span>
              <span>{order.shipping.country}</span>
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
