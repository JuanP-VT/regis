import { Upload } from "@aws-sdk/lib-storage";
import { AwsS3Client } from "@/lib/awsS3Client";
import { v4 as uuid } from "uuid";
import { StoreItemModel } from "@/lib/models/storeItem";
import { StoreItemDB, StoreItemDB_ID } from "@/types/storeItemDB";
import { DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import xss from "xss";
import { validateNewStoreItem } from "@/lib/schema-validators/admin-new-storeitem";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { OPTIONS } from "../../auth/[...nextauth]/nextAuthOptions";
import { Role } from "@/types/user";
export async function POST(req: Request) {
  //Check Environment Variables
  if (
    !process.env.S3_IMAGE_BUCKET_NAME ||
    !process.env.CLOUDFRONT_URL ||
    !process.env.S3_FILES_BUCKET_NAME
  ) {
    //This would return a 500 error, as the server would not be able to function without these environment variables.
    throw new Error(
      "Environment variables not set: S3_IMAGE_BUCKET_NAME, CLOUDFRONT_URL, S3_FILES_BUCKET_NAME"
    );
  }
  //Authenticate user
  try {
    const session = await getServerSession(OPTIONS);
    if (!session || session.user.role !== Role.ADMIN) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al autenticar" },
      { status: 500 }
    );
  }

  //Get form data
  const body = await req.formData();
  const storeItemID = body.get("storeItemID") as string;
  const fileName = body.get("fileName") as string;
  const storeItemName = body.get("storeItemName") as string;
  const price = body.get("price") as string;
  const discountPercentage = body.get("discountPercentage") as string;
  const details = body.get("details") as string;
  const mainImageIndex = body.get("mainImageIndex") as string;
  const imageNamesList = body.getAll("imageNamesList") as string[];
  const imageUrlList = body.getAll("imageUrlList") as string[];
  const newImages = body.getAll("newImages") as File[];

  //Validate form data
  const isValidId = mongoose.Types.ObjectId.isValid(storeItemID);
  if (!isValidId) {
    return new NextResponse("Invalid ID", { status: 400 });
  }
  const newItem: StoreItemDB = {
    fileName,
    storeItemName,
    price: parseFloat(price),
    discountPercentage: parseInt(discountPercentage),
    details: xss(details),
    mainImageIndex: parseInt(mainImageIndex),
    imageNamesList,
    imageUrlList,
  };
  try {
    validateNewStoreItem.parse(newItem);
  } catch (error) {
    return NextResponse.json(
      { message: "Error de validación" },
      { status: 400 }
    );
  }
  //Find item in database
  const findItem =
    ((await StoreItemModel.findById(storeItemID)) as StoreItemDB_ID) || null;
  if (!findItem) {
    return NextResponse.json(
      { message: "Item no encontrado" },
      { status: 404 }
    );
  }
  // For security purposes, the filename of the item in the request will be changed to match the one stored in the database.
  if (findItem.fileName !== newItem.fileName) {
    newItem.fileName = findItem.fileName;
  }
  //The 'ImageNamesList' and 'ImagesUrlList' represent the images that are currently stored in the S3 bucket.
  //If these lists contain fewer elements than before, it indicates that the user wants to delete some images.
  const imagesToDelete = findItem.imageNamesList.filter(
    (imageName) => !imageNamesList.includes(imageName)
  );

  if (imagesToDelete.length > 0) {
    try {
      const keyList = imagesToDelete.map((name) => ({ Key: name }));
      const command = new DeleteObjectsCommand({
        Bucket: process.env.S3_IMAGE_BUCKET_NAME,
        Delete: { Objects: keyList },
      });
      await AwsS3Client.send(command);
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Error al borrar imágenes del bucket" },
        { status: 500 }
      );
    }
  }

  // If there are new images, upload them to s3 bucket
  let uploadedImageNamesList = [] as string[];
  let uploadedImageUrlList = [] as string[];
  if (newImages.length > 0) {
    const keyId = uuid();
    try {
      const uploadPromises = newImages.map(async (file) => {
        const fileExtension = file.name.split(".").pop() as string;
        const keyName = `${keyId}.${fileExtension}`;
        const command = {
          Bucket: process.env.S3_IMAGE_BUCKET_NAME,
          Key: keyName,
          Body: file.stream(),
        };
        const upload = new Upload({ client: AwsS3Client, params: command });
        await upload.done();
        const imageUrl = `https://${process.env.CLOUDFRONT_URL}/${keyId}.${fileExtension}`;
        uploadedImageNamesList.push(keyName);
        uploadedImageUrlList.push(imageUrl);
      });
      await Promise.all(uploadPromises);
    } catch (error) {
      return new Response("Error uploading images", { status: 500 });
    }
  }
  //Update item image names and urls
  const updatedItem: StoreItemDB = {
    ...newItem,
    imageNamesList: [...findItem.imageNamesList, ...uploadedImageNamesList],
    imageUrlList: [...findItem.imageUrlList, ...uploadedImageUrlList],
  };

  //Update item in database
  try {
    await StoreItemModel.findByIdAndUpdate(storeItemID, updatedItem);
    return NextResponse.json(
      { message: "Producto actualizado" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error al actualizar en base de datos" },
      { status: 500 }
    );
  }
}
