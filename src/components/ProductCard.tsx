import { formatPrice } from "@/lib/utils";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.slug}`} prefetch={true}>
      <div className="h-full">
        <Image
          className="aspect-square w-full rounded-t-lg object-cover"
          src={product.image}
          alt={product.name + " image"}
          width={300}
          height={300}
          sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
        />

        <div className="space-y-1 p-4 text-sm">
          <p className="font-semibold">{product.name}</p>
          <p className="">{formatPrice(product.price / 100)}</p>
        </div>
      </div>
    </Link>
  );
}
