import { Order } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function CustomerInfo({ order }: { order: Order }) {
  return (
    <Card className="text-sm">
      <CardHeader className="p-4 text-base">
        <CardTitle>Customer information</CardTitle>
      </CardHeader>

      <CardContent className="space-y-1 p-4 pt-0">
        <p className="flex justify-between">
          <span>User ID</span>
          <span>{order.user.id}</span>
        </p>

        <p className="flex justify-between">
          <span>Name</span>
          <span>{order.user.name}</span>
        </p>

        <p className="flex justify-between">
          <span>Email</span>
          <span>{order.user.email}</span>
        </p>
      </CardContent>
    </Card>
  );
}
