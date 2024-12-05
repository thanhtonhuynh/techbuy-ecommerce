import { PaginationControls } from "@/components/PaginationControls";
import { getOrders } from "@/data-access/order";
import { getCurrentSession } from "@/lib/auth/session";
import { hasAccess } from "@/utils/access-control";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { OrdersTable } from "./OrdersTable";
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
  const { q: searchValue } = searchParams as { [key: string]: string };

  if (page < 1 || perPage < 1) return notFound();

  const { orders, total } = await getOrders({ query: searchValue, page, perPage });

  return (
    <>
      <section className="space-y-1 border-b border-border/40 px-4 py-8 dark:border-border md:px-8 md:py-10 lg:py-12">
        <h1>Orders</h1>
      </section>

      <section className="mt-4 px-4 md:px-8">
        <BreadcrumbNav />
      </section>

      <section className="mt-4 space-y-1 px-4 md:px-8">
        <p className="pl-1 text-xs text-muted-foreground">
          Search for orders by payment intent ID, customer name, or email address.
        </p>
        <Search />
      </section>

      <section className="mt-4 space-y-2 px-4 md:px-8">
        <div className="flex items-center justify-between">
          <p className="flex gap-1 text-xs text-muted-foreground">
            Showing
            <span className="font-semibold">
              {page === 1 ? 1 : (page - 1) * perPage + 1}-{Math.min(page * perPage, total)}
            </span>
            of <span className="font-semibold">{total}</span> orders{" "}
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

        <OrdersTable orders={orders} />
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

      <li className="text-primary">Orders</li>
    </ul>
  );
}
