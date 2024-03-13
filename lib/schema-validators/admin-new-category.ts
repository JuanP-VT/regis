import { z } from "zod";

const subCategory = z.object({ id: z.string().optional(), name: z.string() });

export const validateNewCategory = z.object({
  name: z.string().min(2),
  description: z.string().min(1),
  subCategoryList: z.array(subCategory),
});
