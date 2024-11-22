import { ProductsCarousel } from "@/components/Carousel";
import { getProducts } from "@/data-access/product";
import Image from "next/image";

export default async function Home() {
  const products = await getProducts({ sortKey: "best-selling" });

  return (
    <>
      <section className="flex items-center justify-center px-4 py-8 md:px-8 md:py-10 lg:py-12">
        <h1>Personal. Private. Powerful.</h1>

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
