import { z } from "zod";

export const validateNewStoreItem = z.object({
  fileName: z.string(),
  storeItemName: z.string(),
  price: z.number().min(0),
  discountPercentage: z.number().min(0).max(100),
  imageNamesList: z.array(z.string()),
  imageUrlList: z.array(z.string()),
  details: z.string(),
});
