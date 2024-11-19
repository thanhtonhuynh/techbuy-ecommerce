import { ProductCard } from "@/components/ProductCard";
import { getCategoryProducts } from "@/data-access/product";
import { cn } from "@/lib/utils";
import { getCategoryName } from "@/utils/category";
import { FilterList } from "../FilterList";
import { sortFilters } from "@/constants";

type Params = Promise<{ category: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: { params: Params; searchParams: SearchParams }) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { category } = params;
  const { q: searchValue } = searchParams as { [key: string]: string };

  const products = await getCategoryProducts({ category: params.category });
  const resultsText = products.length > 1 ? "results" : "result";

  return (
    <>
      <section className="border-b border-border/40 px-4 py-8 dark:border-border md:px-8 md:py-10 lg:py-12">
        <h1>
          <span>Shop </span>
          <span className={cn(category !== "iphone" && category !== "ipad" && "capitalize")}>
            {getCategoryName(category)}
          </span>
        </h1>
      </section>

      <FilterList list={sortFilters} />

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
