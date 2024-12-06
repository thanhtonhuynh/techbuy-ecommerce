import { getRelatedProducts } from "@/data-access/product";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getRelatedProducts({ productId: id, limit: 10 });

  if (!relatedProducts.length) return null;

  return (
    <ul className="flex w-full gap-4 space-x-2 overflow-x-auto pb-2">
      {relatedProducts.map((product) => (
        <li
          key={product.id}
          className="w-full flex-none rounded-lg border min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
        >
          <Link href={`/product/${product.slug}`} prefetch={true}>
            <Image
              alt={product.name}
              src={product.image}
              className={"aspect-square w-full rounded-t-lg object-cover"}
              width={300}
              height={300}
              sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
            />

            <div className="space-y-1 p-4 text-sm">
              <p className="font-semibold">{product.name}</p>
              <p className="">{formatPrice(product.price / 100)}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function RelatedProductsSkeleton() {
  return (
    <ul className="flex w-full gap-4 space-x-2 overflow-x-auto pb-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <li
          key={i}
          className="w-full flex-none animate-pulse rounded-lg border min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
        >
          <div className="aspect-square w-full rounded-t-lg bg-gray-200" />

          <div className="space-y-1 p-4 text-sm">
            <div className="h-4 w-3/4 rounded-lg bg-gray-200 font-semibold" />
            <div className="h-4 w-1/2 rounded-lg bg-gray-200" />
          </div>
        </li>
      ))}
    </ul>
  );
}
