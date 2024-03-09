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
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }
  } catch (error) {
    return NextResponse.json({ message: "Server auth error" }, { status: 500 });
  }
  const body = (await req.json()) as Category_ID;
  const unparsedCategory: Category = {
    name: body.name,
    description: body.description,
  };
  //Validate
  try {
    validateNewCategory.parse(unparsedCategory);
  } catch (error) {
    return NextResponse.json({ message: "Validation error" }, { status: 401 });
  }
  //Save to database

  try {
    await categoryModel.findByIdAndUpdate(body._id, unparsedCategory, {
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
