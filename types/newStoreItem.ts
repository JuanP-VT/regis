// Represents the structure that a new store item should have
export interface NewStoreItem {
  fileName: string;
  storeItemName: string;
  details: string;
  mainImageIndex: number;
  images: File[] | null;
  price: number;
  discountPercentage: number;
  categoryIDList: string[];
}
