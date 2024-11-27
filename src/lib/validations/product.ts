import { z } from "zod";

const trimmedString = z.string().trim();
const requiredString = trimmedString.min(1, "Required");
const MAX_IMAGE_SIZE = 1024 * 1024 * 4; // 4MB

export const NewProductSchema = z.object({
  name: requiredString,
  description: requiredString,
  price: z.coerce
    .number({ message: "Required" })
    .int("Must be an integer")
    .positive("Must be positive"),
  category: requiredString,
  image: z
    .instanceof(File, { message: "Required" })
    .refine((file) => file.type.startsWith("image/"), "Invalid file type")
    .refine((file) => file.size <= MAX_IMAGE_SIZE, "File too large")
    .array(),
});
export type NewProductInput = z.infer<typeof NewProductSchema>;
