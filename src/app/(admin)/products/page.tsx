import { Button } from "@/components/ui/button";
import { getProducts } from "@/data-access/product";
import { getCurrentSession } from "@/lib/auth/session";
import { hasAccess } from "@/utils/access-control";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ProductsTable } from "./ProductsTable";

export default async function Page() {
  const { session, user } = await getCurrentSession();
  if (!session) redirect("/login");
  if (user.accountStatus !== "active") return notFound();
  if (!hasAccess(user.role, "/admin")) return notFound();

  const products = await getProducts({});

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

      <section className="mt-4 px-4 md:px-8">
        <BreadcrumbNav />
      </section>

      <section className="mt-8 space-y-2 px-4 md:px-8">
        <ProductsTable products={products} />
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
