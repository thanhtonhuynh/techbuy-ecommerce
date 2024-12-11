import { formatPrice } from "@/lib/utils";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.slug}`} prefetch={true} className="flex flex-row">
      <div className="aspect-square h-36 w-36">
        <Image
          className="h-full w-full rounded-l-lg object-cover"
          src={product.image}
          alt={product.name + " image"}
          width={650}
          height={366}
          sizes="(min-width: 1536px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>

      <div className="space-y-1 p-4 text-sm">
        <p className="">{product.name}</p>
        <p className="font-semibold">{formatPrice(product.price / 100)}</p>
      </div>
    </Link>
  );
}
