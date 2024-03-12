export interface Category {
  name: string;
  description: string;
  subCategories: string[];
}

export interface Category_ID extends Category {
  _id: string;
}
