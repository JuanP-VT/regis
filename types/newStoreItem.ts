export interface NewStoreItem {
  fileName: string; // file name of the product
  storeItemName: string; // Name of the product as it will be displayed in the online store
  details: string; // Detailed description as html of the product
  mainImageIndex: number; // URL of the main image of the product
  images: File[] | null; // Array of image files for the product
  price: number; // Base price of the product, before any discounts are applied
  discountPercentage: number; // Discount applicable to the product, represented as a percentage
}
