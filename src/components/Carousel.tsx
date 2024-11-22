import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Product } from "@prisma/client";
import { ProductCard } from "./ProductCard";

export function ProductsCarousel({ products }: { products: Product[] }) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
    >
      <CarouselContent className="ml-14 py-8 pr-36">
        {products.map((product, index) => (
          <CarouselItem
            key={product.id}
            className={cn("basis-1/3", index === products.length - 1 && "mr-20")}
          >
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
