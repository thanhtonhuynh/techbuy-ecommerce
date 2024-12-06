import { getProductBySlug, getRelatedProducts } from "@/data-access/product";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "./AddToCart";

type Params = Promise<{ slug: string }>;

// TODO: metadata

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const product = await getProductBySlug(params.slug);
  if (!product) return notFound();
  if (product.status !== "active") return notFound();

  return (
    <>
      <section className="flex flex-col gap-4 px-4 py-8 md:px-8 lg:flex-row lg:items-center">
        <Image
          src={product.image}
          alt={product.name}
          width={500}
          height={500}
          className="aspect-square rounded-md object-cover"
          priority
        />

        <div className="space-y-4">
          <h1>{product.name}</h1>

          <p className="whitespace-pre-wrap">{product.description}</p>

          <p className="w-fit rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-secondary">
            {formatPrice(product.price / 100)}
          </p>

          <AddToCartButton product={product} />
        </div>
      </section>

      <RelatedProducts id={product.id} />
    </>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getRelatedProducts({ productId: id, limit: 10 });

  if (!relatedProducts.length) return null;

  return (
    <section className="px-4 py-8 md:px-8">
      <h2 className="mb-2 font-bold">Related Products</h2>

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
    </section>
  );
}
