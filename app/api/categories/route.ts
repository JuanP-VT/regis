import { Category } from "@/types/category";
import { getServerSession } from "next-auth";
import { OPTIONS } from "../auth/[...nextauth]/nextAuthOptions";
import { Role } from "@/types/user";
import { NextResponse } from "next/server";
import { categoryModel } from "@/lib/models/category";
import { validateNewCategory } from "@/lib/schema-validators/admin-new-category";
import { v4 } from "uuid";
import dbConnect from "@/lib/dbConnect";
export async function GET() {
  try {
    await dbConnect();
    const collection = await categoryModel.find({});
    return NextResponse.json(collection, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error con la base de datos" },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(OPTIONS);
    if (!session || session.user.role !== Role.ADMIN) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error al autentificar" },
      { status: 500 },
    );
  }
  const body = (await req.json()) as Category | undefined;
  if (!body) {
    return NextResponse.json({ message: "Invalid body" }, { status: 400 });
  }

  //Validate
  const newCategory: Category = {
    name: body.name.trim().toLowerCase(),
    description: body.description.trim().toLowerCase(),
    subCategoryList: body.subCategoryList ?? [],
  };
  try {
    validateNewCategory.parse(newCategory);
  } catch (error) {
    return NextResponse.json({ message: "Failed Validation" }, { status: 400 });
  }
  //Subcategories must be a list of unique elements and should not contain empty strings
  newCategory.subCategoryList = Array.from(
    new Set(
      newCategory.subCategoryList.filter(
        (subCategory) => subCategory.name !== "",
      ),
    ),
  );
  //Assign unique ID to each new subcategory
  newCategory.subCategoryList = newCategory.subCategoryList.map(
    (subCategory) => ({
      name: subCategory.name.toLowerCase(),
      id: v4(),
    }),
  );
  //Save to DB
  try {
    await categoryModel.create(newCategory);
    return NextResponse.json({ message: "Category saved" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error saving category in the database" },
      { status: 500 },
    );
  }
}
