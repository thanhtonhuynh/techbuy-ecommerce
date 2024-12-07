import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

export function ProductsCarouselSkeleton() {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
    >
      <CarouselContent className="mx-12 mr-16 py-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <CarouselItem
            key={i}
            className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
          >
            <div className="h-full rounded-lg border transition duration-300 ease-in-out hover:scale-105">
              <div className="aspect-square w-full rounded-t-lg bg-gray-200" />

              <div className="space-y-1 p-4 text-sm">
                <div className="h-4 w-3/4 rounded-lg bg-gray-200 font-semibold" />
                <div className="h-4 w-1/2 rounded-lg bg-gray-200" />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />

      <CarouselNext />
    </Carousel>
  );
}
