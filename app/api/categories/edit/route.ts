import { getServerSession } from "next-auth";
import { OPTIONS } from "../../auth/[...nextauth]/nextAuthOptions";
import { Role } from "@/types/user";
import { NextResponse } from "next/server";
import { Category, Category_ID } from "@/types/category";
import { validateNewCategory } from "@/lib/schema-validators/admin-new-category";
import { categoryModel } from "@/lib/models/category";
import { StoreItemModel } from "@/lib/models/storeItem";
import dbConnect from "@/lib/dbConnect";
import { v4 } from "uuid";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(OPTIONS);
    if (!session || session.user.role !== Role.ADMIN) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Server auth error" }, { status: 500 });
  }
  const body = (await req.json()) as Category_ID;
  const categoryToParse: Category = {
    name: body.name,
    description: body.description,
    subCategoryList: body.subCategoryList ?? [],
  };
  //Validate
  try {
    validateNewCategory.parse(categoryToParse);
  } catch (error) {
    return NextResponse.json({ message: "Validation error" }, { status: 400 });
  }
  //Compare request subcategories with the one in database, if there are missing elements it means the user wants to delete them
  //Abort operation if request wants to delete a sub category that is being by a store item
  try {
    await dbConnect();
    const CategoryToEdit: Category_ID | null = await categoryModel.findById(
      body._id,
    );
    if (!CategoryToEdit) {
      return NextResponse.json({ message: "Invalid ID" }, { status: 400 });
    }
    const subCategoryIDListInDB = CategoryToEdit.subCategoryList.map(
      (subCategory) => subCategory.id,
    );
    const requestSubCategoryIDList = categoryToParse.subCategoryList.map(
      (subCategory) => subCategory.id,
    );
    const categoryIDToDelete = subCategoryIDListInDB.filter(
      (id) => !requestSubCategoryIDList.includes(id),
    );
    for (let i = 0; i < categoryIDToDelete.length; i++) {
      const id = categoryIDToDelete[i];
      const find = await StoreItemModel.findOne({
        subCategoryIDList: { $in: id },
      });
      if (find) {
        return NextResponse.json(
          { message: "Sub categoría está en uso" },
          { status: 409 },
        );
      }
    }
  } catch (error) {
    console.error(error);
    NextResponse.json(
      { message: "Error connecting to category document database" },
      { status: 500 },
    );
  }
  //Check if the request is creating new subCategories, assign unique ID to new subCategories
  const updateSubCategories = [...categoryToParse.subCategoryList];
  updateSubCategories.forEach((subCategory, index) => {
    if (subCategory.id === "" || !subCategory.id) {
      const id = v4();
      updateSubCategories[index].id = id;
    }
  });
  //Apply string format after validation
  categoryToParse.name = categoryToParse.name.toLocaleLowerCase();
  categoryToParse.description = categoryToParse.description.toLowerCase();
  //Subcategories must be a list of unique elements and should not contain empty strings
  categoryToParse.subCategoryList = Array.from(
    new Set(
      updateSubCategories.filter((subCategory) => subCategory.name !== ""),
    ),
  );
  //Save to database

  try {
    await categoryModel.findByIdAndUpdate(body._id, categoryToParse, {
      new: true,
    });
    return NextResponse.json({ message: "Category Updated" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error saving to database" },
      { status: 500 },
    );
  }
}
