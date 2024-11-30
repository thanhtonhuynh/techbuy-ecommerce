import { z } from "zod";

const trimmedString = z.string().trim();
const requiredString = trimmedString.min(1, "Required");

export const DeliveryStatusSchema = z.object({
  status: requiredString.toLowerCase(),
});
export type DeliveryStatusInput = z.infer<typeof DeliveryStatusSchema>;
