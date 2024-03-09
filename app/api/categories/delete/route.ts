import { getServerSession } from "next-auth";
import { OPTIONS } from "../../auth/[...nextauth]/nextAuthOptions";
import { Role } from "@/types/user";
import { NextResponse } from "next/server";
import { categoryModel } from "@/lib/models/category";
import { Category_ID } from "@/types/category";
import { StoreItemModel } from "@/lib/models/storeItem";
export async function POST(req: Request) {
  try {
    const session = await getServerSession(OPTIONS);
    if (!session || session.user.role !== Role.ADMIN) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error authenticating" },
      { status: 500 },
    );
  }
  const body = await req.json();
  const id = body._id;
  let findCategory: Category_ID | null;
  try {
    findCategory = await categoryModel.findById(id);
  } catch (error) {
    return NextResponse.json({ message: "Invalid ID" }, { status: 403 });
  }

  if (!findCategory) {
    return NextResponse.json(
      { message: "Category Not Found" },
      { status: 403 },
    );
  }
  //Search in product collection, if a product contains a reference to this category abort operation

  try {
    const result = await StoreItemModel.findOne({
      categoryIDList: { $in: findCategory._id },
    });
    if (result !== null) {
      return NextResponse.json(
        { message: "La categoría está en uso" },
        { status: 402 },
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Error conectado a la base de datos de productos",
      },
      { status: 500 },
    );
  }
  try {
    await categoryModel.findByIdAndDelete(id, { new: true });
    return NextResponse.json(
      { message: "Categoría eliminada" },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error borrando documento" });
  }
}
