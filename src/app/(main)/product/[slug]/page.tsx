import { GoBackButton } from "@/components/buttons/GoBackButton";
import { ProductsCarouselSkeleton } from "@/components/ProductsCarouselSkeleton";
import { getProductBySlug } from "@/data-access/product";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { AddToCartButton } from "./AddToCart";
import { RelatedProducts } from "./RelatedProducts";

type Params = Promise<{ slug: string }>;

// TODO: metadata

export default async function Page(props: { params: Params }) {
  const params = await props.params;
  const product = await getProductBySlug(params.slug);
  if (!product) return notFound();
  if (product.status !== "active") return notFound();

  return (
    <>
      <section className="px-4 py-8 md:px-8">
        <GoBackButton variant={`outline`}>Back</GoBackButton>
      </section>

      <section className="mb-8 flex flex-col gap-4 px-4 md:px-8 lg:flex-row lg:items-center">
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

      <section className="">
        <h2 className="mb-2 px-4 font-bold md:px-8">Related Products</h2>

        <Suspense fallback={<ProductsCarouselSkeleton />}>
          <RelatedProducts id={product.id} />
        </Suspense>
      </section>
    </>
  );
}
