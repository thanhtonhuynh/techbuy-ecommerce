import { Button } from "@/components/ui/button";
import { getProducts } from "@/data-access/product";
import { getCurrentSession } from "@/lib/auth/session";
import { hasAccess } from "@/utils/access-control";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { PaginationControls } from "./PaginationControls";
import { ProductNav } from "./ProductNav";
import { Products } from "./Products";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

export default async function Page(props: { searchParams?: SearchParams }) {
  const { session, user } = await getCurrentSession();
  if (!session) redirect("/login");
  if (user.accountStatus !== "active") return notFound();
  if (!hasAccess(user.role, "/admin")) return notFound();

  const searchParams = await props.searchParams;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const perPage = searchParams?.perPage ? parseInt(searchParams.perPage) : 10;
  const status = searchParams?.status;

  if (page < 1 || perPage < 1) return notFound();

  const { products, total } = await getProducts({ status, page, perPage });

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

        <div className="w-fit">
          <PaginationControls total={total} page={page} perPage={perPage} />
        </div>
      </section>

      <section className="mt-4 px-4 md:px-8">
        <ProductNav />
      </section>

      <section className="mt-4 space-y-2 px-4 md:px-8">
        <Products initialProducts={products} />
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