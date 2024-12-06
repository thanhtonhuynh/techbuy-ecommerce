import { Button } from "@/components/ui/button";
import { getCurrentSession } from "@/lib/auth/session";
import { stripe } from "@/lib/stripe";
import { formatPriceFull } from "@/lib/utils";
import { CircleCheckBig, CircleX } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ClearOptimisticCart } from "./ClearOptimisticCart";

type SearchParams = Promise<{ payment_intent: string }>;

export default async function Page(props: { searchParams: SearchParams }) {
  const { session, user } = await getCurrentSession();
  if (!session) redirect("/login");
  if (user.accountStatus !== "active") return notFound();

  const searchParams = await props.searchParams;
  const paymentIntent = await stripe.paymentIntents.retrieve(searchParams.payment_intent);

  const isSuccess = paymentIntent.status === "succeeded";
  const orderId = paymentIntent.metadata.orderId;

  if (!orderId) return notFound();

  return (
    <>
      {isSuccess && <ClearOptimisticCart />}

      <section className="border-b border-border/40 px-4 py-8 dark:border-border md:px-8 md:py-10 lg:py-12">
        <h1>Order Confirmation</h1>
      </section>

      <section className="mt-8 flex flex-col space-y-8 px-4 py-8 md:px-8">
        <h2 className="flex flex-col items-center gap-2">
          {isSuccess ? (
            <>
              <CircleCheckBig size={36} className="text-green-500" />
              <span>Payment Successful</span>
            </>
          ) : (
            <>
              <CircleX size={36} className="text-red-500" />
              <span>Payment Failed</span>
            </>
          )}
        </h2>

        {isSuccess && (
          <div className="space-y-4">
            <p className="mb-16 border-b pb-4">
              Thank you for your payment. Your order is being processed.
            </p>

            <div className="mx-auto w-full space-y-4 md:w-1/2">
              <p className="flex justify-between">
                <span className="font-semibold">Total paid</span>
                <span>{formatPriceFull(paymentIntent.amount / 100)}</span>
              </p>

              <p className="flex justify-between">
                <span className="font-semibold">Order number</span>
                <span>{paymentIntent.id}</span>
              </p>
            </div>
          </div>
        )}

        <Button className="w-fit self-end" asChild>
          {isSuccess ? (
            <Link href={`/my-orders`}>View Order History</Link>
          ) : (
            <Link href={`/checkout`}>Try Again</Link>
          )}
        </Button>
      </section>
    </>
  );
}
