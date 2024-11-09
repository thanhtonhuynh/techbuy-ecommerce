import { Product } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.id}`}
      className="flex cursor-pointer flex-col items-center rounded-md border text-center transition hover:scale-105 hover:border-blue-600"
    >
      <Image
        className="aspect-square h-full w-full rounded-md object-cover"
        src={product.image}
        alt={product.name + " image"}
        width={300}
        height={300}
      />

      <div className="p flex flex-col items-center space-y-2 p-4">
        <p>{product.name}</p>
        <p className="rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-secondary">
          {formatPrice(product.price / 100)}
        </p>
      </div>
    </Link>
  );
}
