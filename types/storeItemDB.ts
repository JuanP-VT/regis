// Represents the structure of a store item  in the database
export interface StoreItemDB {
  fileName: string;
  storeItemName: string;
  details: string;
  mainImageIndex: number;
  imageNamesList: string[];
  price: number;
  discountPercentage: number;
  imageUrlList: string[];
}

export interface StoreItemDB_ID extends StoreItemDB {
  _id: string;
}
