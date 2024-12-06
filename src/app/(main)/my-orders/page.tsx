import { getOrdersByUserId } from "@/data-access/order";
import { getCurrentSession } from "@/lib/auth/session";
import { notFound, redirect } from "next/navigation";
import { OrderCard } from "./OrderCard";
import { Search } from "./Search";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

export default async function Page(props: { searchParams?: SearchParams }) {
  const { session, user } = await getCurrentSession();
  if (!session) redirect("/login");
  if (user.accountStatus !== "active") return notFound();

  const searchParams = await props.searchParams;
  const { q: searchValue } = searchParams as { [key: string]: string };

  const orders = await getOrdersByUserId(user.id, { query: searchValue });

  return (
    <>
      <section className="space-y-1 border-b border-border/40 px-4 py-8 dark:border-border md:px-8 md:py-10 lg:py-12">
        <h1>My Orders</h1>
      </section>

      <section className="mt-4 space-y-1 px-4 md:px-8">
        <p className="pl-1 text-xs text-muted-foreground">
          Search for orders by order number, or product name
        </p>
        <Search />
      </section>

      <section className="mt-4 space-y-4 px-4 pb-8 md:px-8">
        {orders.length ? (
          orders.map((order) => <OrderCard key={order.id} order={order} />)
        ) : searchValue ? (
          <p className="rounded-md bg-muted p-4 text-center">
            No orders found for <span className="font-semibold">&quot;{searchValue}&quot;</span>
          </p>
        ) : (
          <p className="rounded-md bg-muted p-4 text-center">You haven't placed any orders yet.</p>
        )}
      </section>
    </>
  );
}
