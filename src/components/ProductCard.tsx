import { formatPrice } from "@/lib/utils";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="flex cursor-pointer flex-col items-center rounded-md text-center shadow-[0_0_10px_0_rgba(0,0,0,0.2)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_10px_0_rgba(0,0,0,0.3)]"
    >
      <Image
        className="aspect-square h-full w-full rounded-t-md object-cover"
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
