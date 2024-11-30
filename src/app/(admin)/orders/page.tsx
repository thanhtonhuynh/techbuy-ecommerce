import { getOrders } from "@/data-access/order";
import { getCurrentSession } from "@/lib/auth/session";
import { hasAccess } from "@/utils/access-control";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { OrdersTable } from "./OrdersTable";

export default async function Page() {
  const { session, user } = await getCurrentSession();
  if (!session) redirect("/login");
  if (user.accountStatus !== "active") return notFound();
  if (!hasAccess(user.role, "/admin")) return notFound();

  const orders = await getOrders();

  return (
    <>
      <section className="space-y-1 border-b border-border/40 px-4 py-8 dark:border-border md:px-8 md:py-10 lg:py-12">
        <h1>Orders</h1>
      </section>

      <section className="mt-4 px-4 md:px-8">
        <BreadcrumbNav />
      </section>

      <section className="mt-8 space-y-2 px-4 md:px-8">
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
