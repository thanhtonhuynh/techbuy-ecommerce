"use server";

import { DELIVERY_STATUSES } from "@/constants";
import { getOrderById, updateOrder } from "@/data-access/order";
import { getCurrentSession } from "@/lib/auth/session";
import { DeliveryStatusInput, DeliveryStatusSchema } from "@/lib/validations/order";
import { hasAccess } from "@/utils/access-control";
import { authenticatedRateLimit, rateLimitByKey } from "@/utils/rate-limiter";
import { revalidatePath } from "next/cache";

export async function updateDeliveryStatusAction(orderId: string, data: DeliveryStatusInput) {
  try {
    const { user } = await getCurrentSession();
    if (!user || user.accountStatus !== "active" || !hasAccess(user.role, "/admin")) {
      return "Unauthorized";
    }

    if (!(await authenticatedRateLimit(user.id))) {
      return "Too many requests.";
    }

    if (
      !(await rateLimitByKey({
        key: `${user.id}`,
        limit: 5,
        interval: 10000,
      }))
    ) {
      return "Too many requests.";
    }

    const parsedData = DeliveryStatusSchema.parse(data);

    if (!DELIVERY_STATUSES.includes(parsedData.status)) {
      return "Invalid status";
    }

    const order = await getOrderById(orderId);
    if (!order) {
      return "Order not found";
    }

    if (order.deliveryStatus === parsedData.status) {
      return "Status is already set to this value";
    }

    await updateOrder(orderId, { deliveryStatus: parsedData.status });

    revalidatePath("/orders");
  } catch (error) {
    console.error(error);
    return "Update delivery status failed";
  }
}
