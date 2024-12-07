import { ProductsCarousel } from "@/components/ProductsCarousel";
import { getRelatedProducts } from "@/data-access/product";

export async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getRelatedProducts({ productId: id, limit: 10 });

  if (!relatedProducts.length) return null;

  return <ProductsCarousel products={relatedProducts} />;
}
