import { ProductsCarousel } from "@/components/Carousel";
import { getProducts } from "@/data-access/product";
import Image from "next/image";

export default async function Home() {
  const products = await getProducts({ sortKey: "best-selling" });

  return (
    <>
      <section className="flex items-center justify-center gap-8 xl:gap-32 px-4 py-8 md:px-8 md:py-10 lg:py-12">
        <div className="relative hidden h-72 items-center justify-center lg:flex">
          <div className="animate-blobby absolute -left-16 h-72 w-72 rounded-full bg-blue-300 mix-blend-multiply blur-2xl filter"></div>
          <div className="animate-blobby delay-2000 absolute -right-16 h-72 w-72 rounded-full bg-orange-300 mix-blend-multiply blur-2xl filter"></div>
          <div className="animate-blobby delay-4000 absolute -bottom-10 left-20 h-72 w-72 rounded-full bg-pink-300 mix-blend-multiply blur-2xl filter"></div>
          <h1>Personal. Private. Powerful.</h1>
        </div>

        <Image
          src="https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-card-40-imac-202410?wid=500&hei=348&fmt=p-jpg&qlt=100&.v=1731974953703"
          alt="iMac"
          width={500}
          height={348}
          quality={100}
        />
      </section>

      <ProductsCarousel products={products} />
    </>
  );
}
