"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPriceFull } from "@/lib/utils";
import { Order } from "@/types";
import moment from "moment";
import { useRouter } from "next/navigation";
import { DeliveryStatusBadge, PaymentStatusBadge } from "../../../components/order/StatusBadge";
import { OrderActions } from "./OrderActions";

export function OrdersTable({ orders }: { orders: Order[] }) {
  const router = useRouter();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order #</TableHead>

          <TableHead>Customer</TableHead>

          <TableHead>Price paid</TableHead>

          <TableHead>Payment status</TableHead>

          <TableHead>Delivery status</TableHead>

          <TableHead>Placed at</TableHead>

          <TableHead className="w-10">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {orders.length ? (
          orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="tracking-tighter">{order.paymentIntentId}</TableCell>

              <TableCell>
                <div className="flex flex-col">
                  <span className="font-bold">{order.user.name}</span>
                  <span className="text-muted-foreground">{order.user.email}</span>
                </div>
              </TableCell>

              <TableCell>{formatPriceFull((order.totalAmount * 1.12) / 100)}</TableCell>

              <TableCell>
                <PaymentStatusBadge status={order.paymentStatus} />
              </TableCell>

              <TableCell>
                <DeliveryStatusBadge status={order.deliveryStatus} />
              </TableCell>

              <TableCell>{moment(order.createdAt).format("MMM DD, YYYY HH:mm:ss")}</TableCell>

              <TableCell>
                <OrderActions order={order} />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={8} className="text-center font-bold">
              No orders found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
