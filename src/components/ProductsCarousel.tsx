import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Product } from "@prisma/client";
import { ProductCard } from "./ProductCard";

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
              <ProductCard product={product} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />

      <CarouselNext />
    </Carousel>
  );
}
