import { StoreItemModel } from "@/lib/models/storeItem";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { OPTIONS } from "../../auth/[...nextauth]/nextAuthOptions";

export async function POST(req: Request) {
  const session = await getServerSession(OPTIONS);
  if (!session) {
    return NextResponse.json({ message: "No autorizado" }, { status: 401 });
  }
  const _id = await req.json();
  if (!_id) {
    return NextResponse.json(
      { message: "No se ha enviado el id del producto" },
      { status: 400 }
    );
  }
  const idIsValid = mongoose.isValidObjectId(_id);
  if (!idIsValid) {
    return NextResponse.json({ message: "Id no válido" }, { status: 400 });
  }

  const result = await StoreItemModel.findByIdAndDelete(_id);
  if (!result) {
    return NextResponse.json(
      { message: "No se ha encontrado el producto" },
      { status: 404 }
    );
  }
  return NextResponse.json({ message: "Producto eliminado" });
}
