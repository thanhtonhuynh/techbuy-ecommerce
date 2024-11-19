import { z } from "zod";

const trimmedString = z.string().trim();
const requiredString = trimmedString.min(1, "Required");

export const NewProductSchema = z.object({
  name: requiredString,
  description: requiredString,
  price: z.coerce
    .number({ message: "Required" })
    .int("Must be an integer")
    .positive("Must be positive"),
  image: requiredString.url("Must be a valid URL"),
  category: requiredString,
});
export type NewProductInput = z.infer<typeof NewProductSchema>;
