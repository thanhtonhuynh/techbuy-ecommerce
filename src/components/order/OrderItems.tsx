import { Order } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { OrderItemList } from "./OrderItemList";

export function OrderItems({ order }: { order: Order }) {
  return (
    <Card>
      <CardHeader className="p-4 pb-0 text-base">
        <CardTitle>Items</CardTitle>
      </CardHeader>

      <CardContent className="p-4">
        <OrderItemList list={order.items} />
      </CardContent>
    </Card>
  );
}
