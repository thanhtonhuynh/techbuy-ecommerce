"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPriceFull } from "@/lib/utils";
import { Product } from "@prisma/client";
import moment from "moment";
import Image from "next/image";

export function ProductsTable({ products }: { products: Product[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[50px] px-0 sm:table-cell">
            <span className="sr-only">Image</span>
          </TableHead>

          <TableHead>Name</TableHead>

          <TableHead>Price</TableHead>

          <TableHead>Status</TableHead>

          <TableHead>Category</TableHead>

          <TableHead>Total sales</TableHead>

          <TableHead>Created at</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {products.length ? (
          products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="hidden min-w-[50px] px-0 sm:table-cell">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={50}
                  height={50}
                  quality={100}
                  className="aspect-square rounded-md object-cover"
                />
              </TableCell>

              <TableCell>
                <div className="flex flex-col">
                  <span className="font-bold">{product.name}</span>
                  <span className="text-muted-foreground">{product.id}</span>
                </div>
              </TableCell>

              <TableCell>{formatPriceFull(product.price / 100)}</TableCell>

              <TableCell>
                <Badge variant={`outline`} className="capitalize text-green-500">
                  {product.status}
                </Badge>
              </TableCell>

              <TableCell>{product.category}</TableCell>

              <TableCell>{product.purchasedCount}</TableCell>

              <TableCell>{moment(product.createdAt).format("MMM DD, YYYY")}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={7} className="text-center font-bold">
              No products found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}