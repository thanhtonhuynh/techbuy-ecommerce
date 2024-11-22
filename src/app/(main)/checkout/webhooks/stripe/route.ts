import { deleteCart } from "@/data-access/cart";
import { updateOrder } from "@/data-access/order";
import { updateProductsPurchasedCount } from "@/data-access/product";
import { stripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const event = stripe.webhooks.constructEvent(
    await req.text(),
    req.headers.get("stripe-signature") as string,
    process.env.STRIPE_WEBHOOK_SECRET as string,
  );

  if (event.type === "payment_intent.succeeded") {
    const charge = event.data.object;

    await Promise.all([
      updateOrder(charge.metadata.orderId, {
        paymentStatus: "succeeded",
        deliveryStatus: "pending",
      }),
      updateProductsPurchasedCount(charge.metadata.orderId),
      deleteCart(charge.metadata.cartId),
    ]);
  }

  return new NextResponse();
}
