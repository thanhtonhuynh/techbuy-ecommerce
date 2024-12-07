import { getProductBySlug } from "@/data-access/product";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
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
      <section className="flex flex-col gap-4 px-4 py-8 md:px-8 md:py-10 lg:flex-row lg:items-center lg:py-12">
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
    </>
  );
}
