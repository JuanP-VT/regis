export interface CutFileProduct {
  internalId: string; // Unique identifier for asset management with Google Cloud Storage
  name: string; // Name of the product as it will be displayed in the online store
  price: number; // Base price of the product, before any discounts are applied
  details: string; // Detailed description of the product
  mainImage: string; // URL of the main image of the product
  images: string[]; // Array of URLs of additional images of the product
  discountPercentage: number; // Discount applicable to the product, represented as a percentage
}
