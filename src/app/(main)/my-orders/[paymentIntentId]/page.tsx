import { OrderDetails } from "@/app/(main)/my-orders/[paymentIntentId]/OrderDetails";
import { getDetailedOrderByPaymentIntentId } from "@/data-access/order";
import { getCurrentSession } from "@/lib/auth/session";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

type Params = Promise<{ paymentIntentId: string }>;

export default async function Page(props: { params: Params }) {
  const { session, user } = await getCurrentSession();
  if (!session) redirect("/login");
  if (user.accountStatus !== "active") return notFound();

  const params = await props.params;
  const order = await getDetailedOrderByPaymentIntentId(params.paymentIntentId);
  if (!order || order.user.id !== user.id) return notFound();

  return (
    <>
      <section className="space-y-1 border-b border-border/40 px-4 py-8 dark:border-border md:px-8 md:py-10 lg:py-12">
        <h1>Order Details</h1>
      </section>

      <section className="mt-4 px-4 md:px-8">
        <BreadcrumbNav />
      </section>

      <section className="mt-8 space-y-8 px-4 pb-8 duration-300 animate-in zoom-in-75 md:px-8">
        <OrderDetails order={order} />
      </section>
    </>
  );
}

function BreadcrumbNav() {
  return (
    <ul className="flex items-center gap-2 text-sm text-muted-foreground">
      <li>
        <Link href="/my-orders">My Orders</Link>
      </li>

      <ChevronRight size={14} />

      <li className="text-primary">Order Details</li>
    </ul>
  );
}
