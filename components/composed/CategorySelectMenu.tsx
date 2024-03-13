import { Category_ID } from "@/types/category";
import React from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "@/components/ui/label";
type Props = {
  categoryList: Category_ID[];
  setCategoryIDList: React.Dispatch<React.SetStateAction<string[]>>;
  selectedCategoriesID: string[];
  setSelectedSubCategoriesID: React.Dispatch<React.SetStateAction<string[]>>;
};

export default function CategorySelectMenu({
  categoryList,
  selectedCategoriesID,
  setCategoryIDList,
  setSelectedSubCategoriesID,
}: Props) {
  return (
    <div>
      <Label>Categorías</Label>
      <div className="grid grid-cols-4 gap-2 p-2">
        {categoryList.map((category, index) => (
          <div key={`category${index}`} className="flex items-center space-x-2">
            <Checkbox
              checked={selectedCategoriesID.includes(category._id)}
              onCheckedChange={() => {
                if (selectedCategoriesID.includes(category._id)) {
                  //find index to remove
                  const indexToRemove = selectedCategoriesID.indexOf(
                    category._id,
                  );

                  if (indexToRemove >= 0) {
                    //On category unCheck also unCheck all of its sub categories for data consistency
                    const SubCategoriesIDToRemove =
                      categoryList
                        .find(
                          (categoryItem) => categoryItem._id === category._id,
                        )
                        ?.subCategoryList.map(
                          (subCategory) => subCategory.id,
                        ) ?? [];
                    setSelectedSubCategoriesID((prev) => {
                      const updateSubCategories = [...prev];
                      return updateSubCategories.filter(
                        (subCategory) =>
                          !SubCategoriesIDToRemove.includes(subCategory),
                      );
                    });
                    const updatedSelectedCategories = [...selectedCategoriesID];
                    updatedSelectedCategories.splice(indexToRemove, 1);
                    setCategoryIDList(updatedSelectedCategories);
                  }
                } else {
                  const updatedSelectedCategories = [...selectedCategoriesID];
                  updatedSelectedCategories.push(category._id);
                  setCategoryIDList(updatedSelectedCategories);
                }
              }}
            />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {category.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
