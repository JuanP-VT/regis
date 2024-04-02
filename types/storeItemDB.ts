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
  subCategoryIDList: string[];
}

// Represents the structure of a store item  in the database
export interface StoreItemDB {
  fileName: string;
  storeItemName: string;
  details: string;
  mainImageIndex: number;
  secondaryImageIndex: number;
  imageNamesList: string[];
  price: number;
  discountPercentage: number;
  imageUrlList: string[];
  categoryIDList: string[];
  subCategoryIDList: string[];
}

export interface StoreItemDB_ID extends StoreItemDB {
  _id: string;
}
