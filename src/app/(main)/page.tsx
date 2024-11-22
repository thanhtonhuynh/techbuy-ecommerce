import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/data-access/product";
import Image from "next/image";

export default async function Home() {
  const products = await getProducts({});

  return (
    <>
      <section className="flex items-center justify-center border-b border-border/40 px-4 py-8 dark:border-border md:px-8 md:py-10 lg:py-12">
        <h1>Personal. Private. Powerful.</h1>

        <Image
          src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-card-40-imac-202410?wid=500&hei=348&fmt=p-jpg&qlt=100&.v=1731974953703"
          alt="iMac"
          width={500}
          height={348}
          quality={100}
        />
      </section>

      <section className="px-4 py-8 md:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
