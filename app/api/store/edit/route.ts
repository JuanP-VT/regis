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
import { Category_ID } from "@/types/category";
import { categoryModel } from "@/lib/models/category";
import { createPresignedPost, PresignedPost } from "@aws-sdk/s3-presigned-post";
import dbConnect from "@/lib/dbConnect";
export async function POST(req: Request) {
  //Check Environment Variables
  if (
    !process.env.S3_IMAGE_BUCKET_NAME ||
    !process.env.CLOUDFRONT_URL ||
    !process.env.S3_FILES_BUCKET_NAME
  ) {
    //This would return a 500 error, as the server would not be able to function without these environment variables.
    throw new Error(
      "Environment variables not set: S3_IMAGE_BUCKET_NAME, CLOUDFRONT_URL, S3_FILES_BUCKET_NAME",
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
      { status: 500 },
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
  const secondaryImageIndex = body.get("secondaryImageIndex") as string;
  const imageNamesList = body.getAll("imageNamesList") as string[];
  const imageUrlList = body.getAll("imageUrlList") as string[];
  const newImagesNames = body.getAll("newImageNames") as string[];
  const stringedCategoryIDList = (body.get("categoryIDList") ?? "[]") as string;
  const stringedSubCategoryIDList = (body.get("subCategoryIDList") ??
    "[]") as string;
  const subCategoryIDList = JSON.parse(stringedSubCategoryIDList);
  const categoryIDList = JSON.parse(stringedCategoryIDList) as string[];
  //Validate form data
  const isValidId = mongoose.Types.ObjectId.isValid(storeItemID);
  if (!isValidId) {
    return new NextResponse("Invalid ID", { status: 400 });
  }
  //Check if category list is valid, if an invalid id is found remove it
  let validatedCategoryIDList: string[];
  try {
    await dbConnect();
    const resCategoryList = await categoryModel.find({}).lean();
    const categoryList = JSON.parse(
      JSON.stringify(resCategoryList),
    ) as Category_ID[];
    const allCategoriesIDList = categoryList.map((category) => {
      return category._id;
    });
    validatedCategoryIDList = categoryIDList.filter((category) =>
      allCategoriesIDList.includes(category),
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error al acceder a la base de datos" },
      { status: 500 },
    );
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
    categoryIDList: validatedCategoryIDList,
    subCategoryIDList: subCategoryIDList,
    secondaryImageIndex: parseInt(secondaryImageIndex ?? "0"),
  };
  try {
    validateNewStoreItem.parse(newItem);
  } catch (error) {
    return NextResponse.json(
      { message: "Error de validación" },
      { status: 400 },
    );
  }
  //Find item in database
  const findItem =
    ((await StoreItemModel.findById(storeItemID)) as StoreItemDB_ID) || null;
  if (!findItem) {
    return NextResponse.json(
      { message: "Item no encontrado" },
      { status: 404 },
    );
  }
  // For security purposes, the filename of the item in the request will be changed to match the one stored in the database.
  if (findItem.fileName !== newItem.fileName) {
    newItem.fileName = findItem.fileName;
  }
  //The 'ImageNamesList' and 'ImagesUrlList' represent the images that are currently stored in the S3 bucket.
  //If these lists contain fewer elements than before, it indicates that the user wants to delete some images.
  const imagesToDelete = findItem.imageNamesList.filter(
    (imageName) => !imageNamesList.includes(imageName),
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
        { status: 500 },
      );
    }
  }

  // If there are new images, upload them to s3 bucket
  let uploadedImagesFileName = [] as string[];
  let uploadedImageKeyNamesList = [] as string[]; //Keys of the uploaded images
  let uploadedImageUrlList = [] as string[];
  let presignedPostsData: { presignedPost: PresignedPost; fileName: string }[] =
    [];
  if (newImagesNames.length > 0) {
    try {
      const presignedPostPromises = newImagesNames.map(async (fileName) => {
        const keyId = uuid();
        const fileExtension = fileName.split(".").pop() as string;
        const keyName = `${keyId}.${fileExtension}`;
        const presignedPost = await createPresignedPost(AwsS3Client, {
          Bucket: process.env.S3_IMAGE_BUCKET_NAME,
          Key: keyName,
        });
        const imageUrl = `https://${process.env.CLOUDFRONT_URL}/${keyId}.${fileExtension}`;
        uploadedImageKeyNamesList.push(keyName);
        uploadedImageUrlList.push(imageUrl);
        uploadedImagesFileName.push(fileName);
        return { presignedPost, fileName };
      });
      presignedPostsData = await Promise.all(presignedPostPromises);
    } catch (error) {
      return new Response("Error uploading images", { status: 500 });
    }
  }
  console.log(presignedPostsData);
  //Update item image names and urls
  const updatedItem: StoreItemDB = {
    ...newItem,
    imageNamesList: [...imageNamesList, ...uploadedImageKeyNamesList],
    imageUrlList: [...imageUrlList, ...uploadedImageUrlList],
  };
  //Update main image index if it is out of bounds
  if (updatedItem.mainImageIndex >= updatedItem.imageNamesList.length) {
    updatedItem.mainImageIndex = 0;
  }
  //
  if (
    updatedItem.secondaryImageIndex >= updatedItem.imageNamesList.length ||
    updatedItem.secondaryImageIndex < 0
  ) {
    updatedItem.secondaryImageIndex = 0;
  }
  //Update item in database
  try {
    const updatedProduct = await StoreItemModel.findByIdAndUpdate(
      storeItemID,
      updatedItem,
      {
        new: true,
      },
    );
    return NextResponse.json(
      {
        message: "Producto actualizado",
        updatedProduct,
        presignedPostsData,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error al actualizar en base de datos" },
      { status: 500 },
    );
  }
}
