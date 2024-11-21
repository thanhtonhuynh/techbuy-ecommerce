import { getCart } from "@/data-access/cart";
import { createOrder, getOrder } from "@/data-access/order";
import { getCurrentSession } from "@/lib/auth/session";
import { stripe } from "@/lib/stripe";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { formatPriceFull } from "@/lib/utils";
import { CheckoutForm } from "./CheckoutForm";

export default async function Page() {
  const { session, user } = await getCurrentSession();
  if (!session) redirect("/login");
  if (user.accountStatus !== "active") return notFound();

  const cart = await getCart();
  if (!cart || !cart.items.length) redirect("/");

  const order = (await getOrder()) ?? (await createOrder());
  if (!order) redirect("/");

  const paymentIntent = await stripe.paymentIntents.retrieve(order.paymentIntentId);
  const clientSecret = paymentIntent.client_secret;
  if (!clientSecret) return notFound();

  return (
    <>
      <section className="border-b border-border/40 px-4 py-8 dark:border-border md:px-8 md:py-10 lg:py-12">
        <h1>Checkout</h1>
      </section>

      <div className="flex">
        <section className="w-2/5 border-r px-4 py-8 md:px-8">
          <h2>Order Summary</h2>

          <ul>
            {cart.items.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between gap-2 border-b px-1 py-4"
              >
                <div className="relative flex flex-1 flex-row items-center gap-8">
                  <div className="h-32 w-32 rounded-md border">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      width={128}
                      height={128}
                      className="aspect-square h-full w-full rounded-md object-cover"
                    />
                  </div>

                  <Link
                    href={`/product/${item.product.id}`}
                    className="flex flex-1 flex-col justify-center self-stretch"
                  >
                    <span className="font-medium">{item.product.name}</span>
                    <p className="text-sm">Quantity: {item.quantity}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatPriceFull(item.totalAmount / 100)}
                    </p>
                  </Link>
                </div>
              </li>
            ))}
          </ul>

          <div className="space-y-1 py-4">
            <p className="flex justify-between">
              <span className="font-medium">Subtotal</span>
              <span>{formatPriceFull(cart.totalAmount / 100)}</span>
            </p>

            <p className="flex justify-between">
              <span className="font-medium">Shipping</span>
              <span>Free</span>
            </p>

            <p className="flex justify-between">
              <span className="font-medium">Tax</span>
              <span>{formatPriceFull((cart.totalAmount * 0.12) / 100)}</span>
            </p>

            <p className="flex justify-between">
              <span className="font-bold">Total</span>
              <span>{formatPriceFull((cart.totalAmount * 1.12) / 100)}</span>
            </p>
          </div>
        </section>

        <section className="w-3/5 px-4 py-8 md:px-8">
          <CheckoutForm clientSecret={clientSecret} />
        </section>
      </div>
    </>
  );
}
