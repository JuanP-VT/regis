import { z } from "zod";

export const validateNewCategory = z.object({
  name: z.string().min(2),
  description: z.string().min(1),
  subCategories: z.array(z.string()),
});
