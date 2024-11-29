import { z } from "zod";

const trimmedString = z.string().trim();
const requiredString = trimmedString.min(1, "Required");

export const CategorySchema = z.object({
  name: requiredString,
  slug: requiredString.toLowerCase(),
});
export type CategoryInput = z.infer<typeof CategorySchema>;
