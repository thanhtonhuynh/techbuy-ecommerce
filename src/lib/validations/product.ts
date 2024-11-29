import { z } from "zod";

const trimmedString = z.string().trim();
const requiredString = trimmedString.min(1, "Required");
const MAX_IMAGE_SIZE = 1024 * 1024 * 4; // 4MB
const imageSchema = z
  .instanceof(File, { message: "Required" })
  .refine((file) => file.type.startsWith("image/"), "Invalid file type")
  .refine((file) => file.size <= MAX_IMAGE_SIZE, "File too large");

export const NewProductSchema = z.object({
  name: requiredString,
  description: requiredString,
  price: z.coerce
    .number({ message: "Required" })
    .int("Must be an integer")
    .positive("Must be positive"),
  categoryId: requiredString,
  image: imageSchema.array().min(1, "Required"),
});
export const EditProductSchema = NewProductSchema.extend({
  image: imageSchema.array(),
});
export type ProductInput = z.infer<typeof NewProductSchema>;
