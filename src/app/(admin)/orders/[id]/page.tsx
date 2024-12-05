import { getDetailedOrderById } from "@/data-access/order";
import { getCurrentSession } from "@/lib/auth/session";
import { hasAccess } from "@/utils/access-control";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { OrderDetails } from "./OrderDetails";

type Params = Promise<{ id: string }>;

export default async function Page(props: { params: Params }) {
  const { session, user } = await getCurrentSession();
  if (!session) redirect("/login");
  if (user.accountStatus !== "active") return notFound();
  if (!hasAccess(user.role, "/admin")) return notFound();

  const params = await props.params;
  const order = await getDetailedOrderById(params.id);
  if (!order) return notFound();

  return (
    <>
      <section className="space-y-1 border-b border-border/40 px-4 py-8 dark:border-border md:px-8 md:py-10 lg:py-12">
        <h1>Orders</h1>
      </section>

      <section className="mt-4 px-4 md:px-8">
        <BreadcrumbNav orderId={params.id} />
      </section>

      <section className="mt-8 space-y-8 px-4 md:px-8">
        <OrderDetails order={order} />
      </section>
    </>
  );
}

function BreadcrumbNav({ orderId }: { orderId: string }) {
  return (
    <ul className="flex items-center gap-2 text-sm text-muted-foreground">
      <li>
        <Link href="/dashboard">Dashboard</Link>
      </li>

      <ChevronRight size={14} />

      <li>
        <Link href="/orders">Orders</Link>
      </li>

      <ChevronRight size={14} />

      <li className="text-primary">{orderId}</li>
    </ul>
  );
}
