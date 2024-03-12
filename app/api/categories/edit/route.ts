import { getServerSession } from "next-auth";
import { OPTIONS } from "../../auth/[...nextauth]/nextAuthOptions";
import { Role } from "@/types/user";
import { NextResponse } from "next/server";
import { Category, Category_ID } from "@/types/category";
import { validateNewCategory } from "@/lib/schema-validators/admin-new-category";
import { categoryModel } from "@/lib/models/category";

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
    subCategories: body.subCategories ?? [],
  };
  //Validate
  try {
    validateNewCategory.parse(categoryToParse);
  } catch (error) {
    return NextResponse.json({ message: "Validation error" }, { status: 400 });
  }
  //Apply string format after validation
  categoryToParse.name = categoryToParse.name.toLocaleLowerCase();
  categoryToParse.description = categoryToParse.description.toLowerCase();
  //Subcategories must be a list of unique elements and should not contain empty strings
  categoryToParse.subCategories = Array.from(
    new Set(
      categoryToParse.subCategories.filter((subCategory) => subCategory !== ""),
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
