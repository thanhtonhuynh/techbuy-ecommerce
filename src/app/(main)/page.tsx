import { ProductsCarousel } from "@/components/ProductsCarousel";
import { getProducts } from "@/data-access/product";
import Image from "next/image";

export default async function Home() {
  const { products: popularProducts } = await getProducts({
    status: "active",
    sortKey: "purchasedCount",
    reverse: true,
  });

  const { products: latestProducts } = await getProducts({
    status: "active",
    sortKey: "createdAt",
    reverse: true,
  });

  return (
    <>
      <section className="flex items-center justify-center gap-8 px-4 py-8 md:py-10 lg:gap-16 lg:py-12 xl:gap-32">
        <div className="relative hidden h-72 w-fit items-center justify-center lg:flex">
          <div className="absolute -left-16 h-72 w-2/3 animate-blobby rounded-full bg-blue-300 mix-blend-multiply blur-2xl filter"></div>
          <div className="absolute -right-16 h-72 w-1/2 animate-blobby rounded-full bg-orange-300 mix-blend-multiply blur-2xl filter delay-2000"></div>
          <div className="absolute -bottom-10 left-20 h-72 w-2/3 animate-blobby rounded-full bg-pink-300 mix-blend-multiply blur-2xl filter delay-4000"></div>
          <h1 className="flex flex-row gap-2 text-4xl">
            <span>Personal.</span> <span>Private.</span> <span>Powerful.</span>
          </h1>
        </div>

        <h1 className="gradient-text flex flex-col text-4xl lg:hidden">
          <span>Personal.</span> <span>Private.</span> <span>Powerful.</span>
        </h1>

        <Image
          src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-card-40-imac-202410?wid=500&hei=348&fmt=p-jpg&qlt=100&.v=1731974953703"
          alt="iMac"
          width={500}
          height={348}
          quality={100}
        />
      </section>

      <section className="mt-16 space-y-1">
        <div className="px-4 md:px-8">
          <h1 className="gradient-text w-fit">Popular Products</h1>
          <p className="text-muted-foreground">Discover the most popular products in our store.</p>
        </div>

        <ProductsCarousel products={popularProducts} />
      </section>

      <section className="mt-8 space-y-1">
        <div className="px-4 md:px-8">
          <h1 className="gradient-text w-fit">Latest Products</h1>
          <p className="text-muted-foreground">New. Now. Next. See what's new in our store.</p>
        </div>

        <ProductsCarousel products={latestProducts.slice(0, 10)} />
      </section>
    </>
  );
}
