import { ProductCard } from "@/components/ProductCard";
import { defaultSort, sortFilters } from "@/constants";
import { getCategoryBySlug } from "@/data-access/category";
import { getCategoryProducts } from "@/data-access/product";
import { notFound } from "next/navigation";
import { FilterList } from "../FilterList";

type Params = Promise<{ categorySlug: string }>;
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page(props: { params: Params; searchParams?: SearchParams }) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { categorySlug } = params;
  const { sort } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sortFilters.find((filter) => filter.slug === sort) || defaultSort;

  const existingCategory = await getCategoryBySlug(categorySlug);
  if (!existingCategory) return notFound();

  const products = await getCategoryProducts({
    status: "active",
    categorySlug: params.categorySlug,
    sortKey,
    reverse,
  });

  return (
    <>
      <section className="border-b border-border/40 px-4 py-8 dark:border-border md:px-8 md:py-10 lg:py-12">
        <h1 className="gradient-text w-fit">Shop {existingCategory.name}</h1>
      </section>

      <section className="space-y-1 border-b border-border/40 px-4 py-8 dark:border-border md:px-8">
        <h3 className="text-sm font-normal text-muted-foreground">Sort by</h3>

        <FilterList list={sortFilters.slice(1)} />
      </section>

      <section className="px-4 py-8 md:px-8">
        <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <li
              key={product.id}
              className="rounded-lg border shadow transition duration-300 ease-in-out hover:scale-105"
            >
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
