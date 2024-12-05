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
import { OrderActions } from "./OrderActions";
import { DeliveryStatusBadge, PaymentStatusBadge } from "./StatusBadge";

export function OrdersTable({ orders }: { orders: Order[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Payment Intent #</TableHead>

          <TableHead>Customer</TableHead>

          <TableHead>Price Paid</TableHead>

          <TableHead>Payment Status</TableHead>

          <TableHead>Delivery Status</TableHead>

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
              <TableCell className="tracking-tighter">{order.paymentIntentId.slice(3)}</TableCell>

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
