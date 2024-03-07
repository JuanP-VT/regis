export interface NewStoreItem {
  fileName: string;
  storeItemName: string;
  details: string;
  mainImageIndex: number;
  images: File[] | null;
  price: number;
  discountPercentage: number;
}
