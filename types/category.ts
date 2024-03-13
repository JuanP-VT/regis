export type SubCategory = {
  id: string;
  name: string;
};
export interface Category {
  name: string;
  description: string;
  subCategoryList: SubCategory[];
}

export interface Category_ID extends Category {
  _id: string;
}

interface ProCategory {}
