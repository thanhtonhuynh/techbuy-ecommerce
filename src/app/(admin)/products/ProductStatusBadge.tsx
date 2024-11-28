import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ProductStatusBadge({ status }: { status: string }) {
  return (
    <Badge
      variant={`outline`}
      className={cn(
        "capitalize",
        status === "active" && "text-green-500",
        status === "draft" && "text-yellow-500",
        status === "unavailable" && "text-red-500",
        status === "archived" && "text-gray-500",
      )}
    >
      {status}
    </Badge>
  );
}
