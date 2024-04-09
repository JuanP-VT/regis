import { StoreItemModel } from "@/lib/models/storeItem";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { OPTIONS } from "../../auth/[...nextauth]/nextAuthOptions";
import { StoreItemDB } from "@/types/storeItemDB";
import { DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { AwsS3Client } from "@/lib/awsS3Client";
import { Role } from "@/types/user";
import dbConnect from "@/lib/dbConnect";
export async function POST(req: Request) {
  //Check Environment Variables
  if (!process.env.S3_IMAGE_BUCKET_NAME) {
    throw new Error("S3_IMAGE_BUCKET_NAME is not defined");
  }
  //Authorization
  try {
    const session = await getServerSession(OPTIONS);
    if (!session || session.user.role !== Role.ADMIN) {
      return NextResponse.json({ message: "No autorizado" }, { status: 401 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error de autorización" },
      { status: 500 },
    );
  }

  //Validate request
  const _id = await req.json();
  if (!_id && typeof _id !== "string" && _id !== "") {
    return NextResponse.json(
      { message: "No se ha enviado el id del producto" },
      { status: 400 },
    );
  }
  const idIsValid = mongoose.isValidObjectId(_id);
  if (!idIsValid) {
    return NextResponse.json({ message: "Id no válido" }, { status: 400 });
  }

  // Find document in db and delete images from s3 bucket
  let find: StoreItemDB | null = null;
  try {
    await dbConnect();
    find = (await StoreItemModel.findOne({
      _id,
    })) as StoreItemDB | null;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error encontrado el documento en la base de datos" },
      { status: 500 },
    );
  }
  if (find) {
    try {
      //Delete images associated with the file store reference
      const keyList = find.imageNamesList.map((name) => ({ Key: name }));
      const command = new DeleteObjectsCommand({
        Bucket: process.env.S3_IMAGE_BUCKET_NAME,
        Delete: { Objects: keyList },
      });
      await AwsS3Client.send(command);
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Error borrando la imagen en el bucket" },
        { status: 500 },
      );
    }

    //Delete database reference
    try {
      await StoreItemModel.deleteOne({ _id });
      return NextResponse.json(
        { message: "Producto eliminado" },
        { status: 200 },
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Error deleting document in database" },
        { status: 500 },
      );
    }
  }
}
