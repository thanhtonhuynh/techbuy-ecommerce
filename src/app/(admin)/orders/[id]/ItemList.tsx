import { formatPriceFull } from "@/lib/utils";
import { OrderItem } from "@/types";
import Image from "next/image";
import Link from "next/link";

export function ItemList({ list }: { list: OrderItem[] }) {
  return (
    <ul>
      {list.map((item) => (
        <li key={item.id} className="flex items-center justify-between gap-2 border-b px-1 py-4">
          <div className="relative flex flex-1 flex-row items-center gap-8">
            <div className="h-32 w-32 rounded-md border">
              <Image
                src={item.product.image}
                alt={item.product.name}
                width={128}
                height={128}
                className="aspect-square h-full w-full rounded-md object-cover"
              />
            </div>

            <Link
              href={`/product/${item.product.id}`}
              className="flex flex-1 flex-col justify-center self-stretch"
            >
              <span className="font-medium">{item.product.name}</span>
              <p className="text-sm">Quantity: {item.quantity}</p>
              <p className="text-sm text-muted-foreground">
                Unit price: {formatPriceFull(item.unitPrice / 100)}
              </p>
              <p className="text-sm text-muted-foreground">
                Total price: {formatPriceFull(item.totalAmount / 100)}
              </p>
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
