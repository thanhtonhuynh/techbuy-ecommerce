import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function PaymentStatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant={`outline`}
      className={cn(
        "capitalize",
        status === "pending" && "text-muted-foreground",
        status === "succeeded" && "text-green-500",
      )}
    >
      {status}
    </Badge>
  );
}

export function DeliveryStatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant={`outline`}
      className={cn(
        "text-nowrap capitalize",
        status === "awaiting payment" && "text-muted-foreground",
        status === "pending" && "text-orange-500",
        status === "scheduled" && "text-teal-500",
        status === "shipped" && "text-blue-500",
        status === "delivered" && "text-green-500",
      )}
    >
      {status}
    </Badge>
  );
}
