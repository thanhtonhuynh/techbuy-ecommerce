import { ProductCard } from "@/components/ProductCard";
import { defaultSort, sortFilters } from "@/constants";
import { getProducts } from "@/data-access/product";
import { ClearSearchButton } from "./ClearSearchButton";
import { FilterList } from "./FilterList";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: { searchParams?: SearchParams }) {
  const searchParams = await props.searchParams;
  const { sort, shop_q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sortFilters.find((filter) => filter.slug === sort) || defaultSort;

  const { products } = await getProducts({
    status: "active",
    sortKey,
    reverse,
    query: searchValue,
  });
  const resultsText = products.length > 1 ? "results" : "result";

  return (
    <>
      <section className="border-b border-border/40 px-4 py-8 dark:border-border md:px-8 md:py-10 lg:py-12">
        {searchValue ? (
          <h1 className="flex items-center justify-between text-2xl">
            <div>
              {products.length === 0
                ? `There are no products that match `
                : `Showing ${products.length} ${resultsText} for `}
              <span className="font-extrabold">&quot;{searchValue}&quot;</span>
            </div>

            <div className="hidden md:block">
              <ClearSearchButton variant={`outline`} />
            </div>
          </h1>
        ) : (
          <h1 className="gradient-text w-fit">Shop All Products</h1>
        )}
      </section>

      <section className="flex items-center justify-between space-y-1 border-b border-border/40 bg-muted p-4 dark:border-border md:px-8">
        <FilterList list={searchValue ? sortFilters : sortFilters.slice(1)} />

        {searchValue && (
          <div className="md:hidden">
            <ClearSearchButton variant={`link`} />
          </div>
        )}
      </section>

      <section className="px-4 py-8 md:px-8">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {products.map((product) => (
            <li
              key={product.id}
              className="rounded-lg border shadow transition duration-300 ease-in-out hover:scale-105 hover:border-blue-500"
            >
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
