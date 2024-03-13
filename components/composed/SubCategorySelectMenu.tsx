import { Category_ID, SubCategory } from "@/types/category";
import React from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "@/components/ui/label";
type Props = {
  subCategoryList: SubCategory[];
  setSelectedSubCategoriesID: React.Dispatch<React.SetStateAction<string[]>>;
  selectedSubCategoriesID: string[];
};

export default function SubCategorySelectMenu({
  subCategoryList,
  selectedSubCategoriesID,
  setSelectedSubCategoriesID,
}: Props) {
  return (
    <div>
      <Label>Sub Categorías</Label>
      <div className="grid grid-cols-4 gap-2 p-2">
        {subCategoryList.map((subCategory, index) => (
          <div key={`category${index}`} className="flex items-center space-x-2">
            <Checkbox
              checked={selectedSubCategoriesID.includes(subCategory.id)}
              onCheckedChange={() => {
                if (selectedSubCategoriesID.includes(subCategory.id)) {
                  //find index to remove
                  const indexToRemove = selectedSubCategoriesID.indexOf(
                    subCategory.id,
                  );
                  if (indexToRemove >= 0) {
                    const updatedSelectedCategories = [
                      ...selectedSubCategoriesID,
                    ];
                    updatedSelectedCategories.splice(indexToRemove, 1);
                    setSelectedSubCategoriesID(updatedSelectedCategories);
                  }
                } else {
                  const updatedSelectedSubCategories = [
                    ...selectedSubCategoriesID,
                  ];
                  updatedSelectedSubCategories.push(subCategory.id);
                  setSelectedSubCategoriesID(updatedSelectedSubCategories);
                }
              }}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {subCategory.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
