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
        createdAt: new Date(Date.now()),
        shipping: {
          name: charge.shipping?.name || "",
          line1: charge.shipping?.address?.line1 || "",
          line2: charge.shipping?.address?.line2 || "",
          city: charge.shipping?.address?.city || "",
          postalCode: charge.shipping?.address?.postal_code || "",
          country: charge.shipping?.address?.country || "",
          state: charge.shipping?.address?.state || "",
        },
        phone: charge.shipping?.phone,
      }),
      updateProductsPurchasedCount(charge.metadata.orderId),
      deleteCart(charge.metadata.cartId),
    ]);
  }

  return new NextResponse();
}
