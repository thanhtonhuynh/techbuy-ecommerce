"use client";

import { LoadingButton } from "@/components/buttons/LoadingButton";
import { getStripe } from "@/utils/get-stripejs";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useTransition } from "react";
import { toast } from "sonner";

type CheckoutFormProps = {
  clientSecret: string;
};

const stripePromise = getStripe();

export function CheckoutForm({ clientSecret }: CheckoutFormProps) {
  return (
    <Elements options={{ clientSecret }} stripe={stripePromise}>
      <Form />
    </Elements>
  );
}

export function Form() {
  const stripe = useStripe();
  const elements = useElements();
  const [pending, startTransition] = useTransition();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!stripe || !elements) return;

    startTransition(async () => {
      await stripe
        .confirmPayment({
          elements,
          confirmParams: {
            return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success`,
          },
        })
        .then(({ error }) => {
          if (error.type === "card_error" || error.type === "validation_error") {
            toast.error(error.message);
          } else {
            toast.error("Something went wrong. Please try again.");
          }
        });
    });
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <h2>Payment</h2>
        <p className="text-muted-foreground">All transactions are secure and encrypted.</p>
      </div>

      <PaymentElement />

      <LoadingButton
        className="w-full"
        loading={pending}
        disabled={!stripe || !elements || pending}
        type="submit"
      >
        {pending ? "Processing..." : "Pay Now"}
      </LoadingButton>
    </form>
  );
}
