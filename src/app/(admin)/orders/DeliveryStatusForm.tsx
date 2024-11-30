import { LoadingButton } from "@/components/buttons/LoadingButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { DELIVERY_STATUSES } from "@/constants";
import { cn } from "@/lib/utils";
import { DeliveryStatusInput, DeliveryStatusSchema } from "@/lib/validations/order";
import { Order } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { updateDeliveryStatusAction } from "./actions";

type DeliveryStatusFormProps = {
  order: Order;
  setOpen: Dispatch<SetStateAction<boolean>>;
  className?: string;
};

export function DeliveryStatusForm({ order, setOpen, className }: DeliveryStatusFormProps) {
  const [isPending, startTransition] = useTransition();
  const form = useForm<DeliveryStatusInput>({
    resolver: zodResolver(DeliveryStatusSchema),
    defaultValues: {
      status: order.deliveryStatus,
    },
  });

  async function onSubmit(data: DeliveryStatusInput) {
    startTransition(async () => {
      const error = await updateDeliveryStatusAction(order.id, data);

      if (error) toast.error(error);
      else {
        setOpen(false);
        toast.success("Delivery status updated.");
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-5", className)}>
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Order #: {order.id}</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2"
                >
                  {DELIVERY_STATUSES.map((status) => (
                    <FormItem key={status} className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={status} />
                      </FormControl>
                      <FormLabel className="font-normal capitalize">{status}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <LoadingButton type="submit" className="w-full" loading={isPending}>
          Submit
        </LoadingButton>
      </form>
    </Form>
  );
}
