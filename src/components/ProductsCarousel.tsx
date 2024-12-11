import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { formatPrice } from "@/lib/utils";
import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

function CarouselProductItem({ product }: { product: Product }) {
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

export function ProductsCarousel({ products }: { products: Product[] }) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
    >
      <CarouselContent className="mx-12 mr-16 py-4">
        {products.map((product) => (
          <CarouselItem
            key={product.id}
            className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="h-full rounded-lg border transition duration-300 ease-in-out hover:scale-105">
              <CarouselProductItem product={product} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />

      <CarouselNext />
    </Carousel>
  );
}
