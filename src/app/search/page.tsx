import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/data-access/product";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const { q: searchValue } = searchParams as { [key: string]: string };

  const products = await getProducts({ query: searchValue });
  const resultsText = products.length > 1 ? "results" : "result";

  return (
    <>
      <section className="border-b border-border/40 px-4 py-8 dark:border-border md:px-8 md:py-10 lg:py-12">
        {searchValue ? (
          <h1 className="text-2xl">
            {products.length === 0
              ? `There are no products that match `
              : `Showing ${products.length} ${resultsText} for `}
            <span className="font-extrabold">&quot;{searchValue}&quot;</span>
          </h1>
        ) : (
          <h1>Browse All Products</h1>
        )}
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
