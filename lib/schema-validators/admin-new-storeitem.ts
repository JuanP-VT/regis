import { z } from "zod";

export const validateNewStoreItem = z.object({
  fileName: z.string().min(2).max(100),
  storeItemName: z.string().min(1),
  price: z.number().min(0),
  discountPercentage: z.number().min(0).max(100),
  imageNamesList: z.array(z.string()),
  imageUrlList: z.array(z.string()),
  details: z.string().min(1),
  categoryIDList: z.array(z.string()),
  subCategoryIDList: z.array(z.string()).optional(),
});
