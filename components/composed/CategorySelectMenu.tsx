import { Category_ID } from "@/types/category";
import React from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "@/components/ui/label";
type Props = {
  categoryList: Category_ID[];
  setCategoryIDList: React.Dispatch<React.SetStateAction<string[]>>;
  selectedCategories: string[];
};

export default function CategorySelectMenu({
  categoryList,
  selectedCategories,
  setCategoryIDList,
}: Props) {
  return (
    <div>
      <Label>Categorías</Label>
      <div className="grid grid-cols-4 gap-2 p-2">
        {categoryList.map((category, index) => (
          <div key={`category${index}`} className="flex items-center space-x-2">
            <Checkbox
              checked={selectedCategories.includes(category._id)}
              onCheckedChange={() => {
                if (selectedCategories.includes(category._id)) {
                  //find index to remove
                  const indexToRemove = selectedCategories.indexOf(
                    category._id,
                  );
                  if (indexToRemove >= 0) {
                    const updatedSelectedCategories = [...selectedCategories];
                    updatedSelectedCategories.splice(indexToRemove, 1);
                    setCategoryIDList(updatedSelectedCategories);
                  }
                } else {
                  const updatedSelectedCategories = [...selectedCategories];
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
