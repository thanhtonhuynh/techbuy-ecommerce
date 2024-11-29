import { getCategories } from "@/data-access/category";
import { getProductById } from "@/data-access/product";
import { getCurrentSession } from "@/lib/auth/session";
import { hasAccess } from "@/utils/access-control";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ProductForm } from "../../new/ProductForm";

type Params = Promise<{ id: string }>;

export default async function Page(props: { params: Params }) {
  const { session, user } = await getCurrentSession();
  if (!session) redirect("/login");
  if (user.accountStatus !== "active") return notFound();
  if (!hasAccess(user.role, "/admin")) return notFound();

  const params = await props.params;
  const product = await getProductById(params.id);
  if (!product) return notFound();

  const categories = await getCategories();

  return (
    <>
      <section className="space-y-1 border-b border-border/40 px-4 py-8 dark:border-border md:px-8 md:py-10 lg:py-12">
        <h1>Products</h1>
        <p className="text-muted-foreground">
          Manage your products and view and their sales performance.
        </p>
      </section>

      <section className="mt-4 px-4 md:px-8">
        <BreadcrumbNav />
      </section>

      <section className="mt-8 space-y-2 px-4 md:px-8">
        <ProductForm product={product} categories={categories} />
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

      <li>
        <Link href="/products">Products</Link>
      </li>

      <ChevronRight size={14} />

      <li className="text-primary">Edit product</li>
    </ul>
  );
}
