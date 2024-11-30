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

export function OrdersTable({ orders }: { orders: Order[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order #</TableHead>

          <TableHead>Customer</TableHead>

          <TableHead>Payment ID</TableHead>

          <TableHead>Price Paid</TableHead>

          <TableHead>Payment Status</TableHead>

          <TableHead>Delivery Status</TableHead>

          <TableHead>Date</TableHead>

          <TableHead className="w-10">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {orders.length ? (
          orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>

              <TableCell>
                <div className="flex flex-col">
                  <span className="font-bold">{order.user.name}</span>
                  <span className="text-muted-foreground">{order.user.email}</span>
                </div>
              </TableCell>

              <TableCell>{order.paymentIntentId}</TableCell>

              <TableCell>{formatPriceFull(order.totalAmount / 100)}</TableCell>

              <TableCell>{order.paymentStatus}</TableCell>

              <TableCell>{order.deliveryStatus}</TableCell>

              <TableCell>{moment(order.updatedAt).format("MMM DD, YYYY hh:mm")}</TableCell>

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
