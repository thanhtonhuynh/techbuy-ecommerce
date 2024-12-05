import { formatPriceFull } from "@/lib/utils";
import { OrderItem } from "@/types";
import Image from "next/image";
import Link from "next/link";

export function OrderItemList({ list }: { list: OrderItem[] }) {
  return (
    <ul>
      {list.map((item) => (
        <li key={item.id} className="flex items-center gap-4 border-b px-1 py-4">
          <div className="h-16 w-16 rounded-md">
            <Image
              src={item.product.image}
              alt={item.product.name}
              width={64}
              height={64}
              className="aspect-square h-full w-full rounded-md object-cover"
            />
          </div>

          <div className="space-y-1">
            <Link
              href={`/product/${item.product.slug}`}
              className="text-sm font-medium underline-offset-4 transition-all hover:text-blue-500 hover:underline"
            >
              {item.product.name}
            </Link>

            <div className="flex gap-8">
              <div className="text-sm text-muted-foreground">
                <p>Quantity</p>
                <p className="font-semibold">{item.quantity}</p>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Unit price</p>
                <p className="font-semibold">{formatPriceFull(item.unitPrice / 100)}</p>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Total price</p>
                <p className="font-semibold">{formatPriceFull(item.totalAmount / 100)}</p>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
