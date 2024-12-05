import { FilterList } from "@/app/(main)/shop/FilterList";
import { PaginationControls } from "@/components/PaginationControls";
import { Button } from "@/components/ui/button";
import { defaultSort, sortFilters } from "@/constants";
import { getAdminProducts } from "@/data-access/product";
import { getCurrentSession } from "@/lib/auth/session";
import { hasAccess } from "@/utils/access-control";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ProductNav } from "./ProductNav";
import { ProductsTable } from "./ProductsTable";
import { Search } from "./Search";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

export default async function Page(props: { searchParams?: SearchParams }) {
  const { session, user } = await getCurrentSession();
  if (!session) redirect("/login");
  if (user.accountStatus !== "active") return notFound();
  if (!hasAccess(user.role, "/admin")) return notFound();

  const searchParams = await props.searchParams;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const perPage = searchParams?.perPage ? parseInt(searchParams.perPage) : 10;
  const { sort, status, q: searchValue } = searchParams as { [key: string]: string };
  const { sortKey, reverse } = sortFilters.find((filter) => filter.slug === sort) || defaultSort;

  if (page < 1 || perPage < 1) return notFound();

  const { products, total } = await getAdminProducts({
    status,
    sortKey,
    reverse,
    query: searchValue, // name
    page,
    perPage,
  });

  return (
    <>
      <section className="flex items-center justify-between border-b border-border/40 px-4 py-8 dark:border-border md:px-8 md:py-10 lg:py-12">
        <div className="space-y-1">
          <h1>Products</h1>
          <p className="text-muted-foreground">
            Manage your products and view and their sales performance.
          </p>
        </div>

        <Button asChild>
          <Link href={`/products/new`}>Add new product</Link>
        </Button>
      </section>

      <section className="mt-4 flex justify-between px-4 md:px-8">
        <BreadcrumbNav />
      </section>

      <section className="mt-4 space-y-4 px-4 md:px-8">
        <div className="space-y-1">
          <p className="pl-1 text-xs text-muted-foreground">Browse products by status</p>
          <ProductNav />
        </div>

        <div className="flex items-center justify-between gap-2">
          <div className="flex-1 space-y-1">
            <p className="pl-1 text-xs text-muted-foreground">Search for products by name</p>
            <Search />
          </div>

          <div className="space-y-1">
            <p className="pl-1 text-xs text-muted-foreground">Sort by</p>
            <div className="flex h-9 items-center rounded-md border px-3 py-1 text-sm text-muted-foreground">
              <FilterList list={sortFilters.slice(1)} />
            </div>
          </div>
        </div>
      </section>

      <section className="mt-4 space-y-2 px-4 md:px-8">
        <ProductsTable products={products} />

        <div className="flex items-center justify-between">
          <p className="flex gap-1 text-xs text-muted-foreground">
            Showing
            <span className="font-semibold">
              {Math.min((page - 1) * perPage + 1, total)}-{Math.min(page * perPage, total)}
            </span>
            of <span className="font-semibold">{total}</span> products{" "}
            {searchValue && (
              <>
                for <span className="font-bold">&quot;{searchValue}&quot;</span>
              </>
            )}
          </p>

          <div className="w-fit">
            <PaginationControls total={total} page={page} perPage={perPage} />
          </div>
        </div>
      </section>
    </>
  );
}

function BreadcrumbNav() {
  return (
    <ul className="flex items-center gap-2 text-sm text-muted-foreground">
      <li>
        <Link href="/dashboard">Dashboard</Link>
      </li>

      <ChevronRight size={14} />

      <li className="text-primary">Products</li>
    </ul>
  );
}
