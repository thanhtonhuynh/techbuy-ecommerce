import { formatPriceFull } from "@/lib/utils";
import { Order } from "@/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { PaymentStatusBadge } from "./StatusBadge";

export function OrderSummary({ order }: { order: Order }) {
  return (
    <Card className="text-sm">
      <CardHeader className="flex-row items-center justify-between space-y-0 p-4 text-base">
        <CardTitle>Order Summary</CardTitle>
        <PaymentStatusBadge status={order.paymentStatus} />
      </CardHeader>

      <CardContent className="space-y-1 p-4 pt-0">
        <p className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatPriceFull(order.totalAmount / 100)}</span>
        </p>

        <p className="flex justify-between">
          <span>Shipping</span>
          <span>Free</span>
        </p>

        <p className="flex justify-between">
          <span>Tax</span>
          <span>{formatPriceFull((order.totalAmount * 0.12) / 100)}</span>
        </p>
      </CardContent>

      <CardFooter className="flex justify-between rounded-b-xl bg-muted p-4 py-3">
        <span className="font-bold">Total</span>
        <span className="font-bold">{formatPriceFull((order.totalAmount * 1.12) / 100)}</span>
      </CardFooter>
    </Card>
  );
}
