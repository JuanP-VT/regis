import { validateNewStoreItem } from "@/lib/schema-validators/admin-new-storeitem";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { OPTIONS } from "../auth/[...nextauth]/nextAuthOptions";
import { createPresignedPost, PresignedPost } from "@aws-sdk/s3-presigned-post";
import { v4 as uuidv4 } from "uuid";
import { AwsS3Client } from "@/lib/awsS3Client";
import { StoreItemModel } from "@/lib/models/storeItem";
import { StoreItemDB } from "@/types/storeItemDB";
import xss from "xss";
import { Role } from "@/types/user";
import dbConnect from "@/lib/dbConnect";

//Create a new store item
export async function POST(req: Request) {
  const session = await getServerSession(OPTIONS);
  if (!session || session.user.role !== Role.ADMIN) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const body = await req.formData();
  // Casting types on this data form to circumvent TypeScript errors. The constructed object will undergo validation subsequently.
  const fileName = body.get("fileName") as string;
  const storeItemName = body.get("storeItemName") as string;
  const price = body.get("price") as string;
  const discountPercentage = body.get("discountPercentage") as string;
  const images = body.getAll("images") as File[];
  const mainImageIndex = body.get("mainImageIndex") as string;
  const secondaryImageIndex = body.get("secondaryImageIndex") as string;
  const details = body.get("details") as string;
  const unparsedCategoryList = (body.get("categoryIDList") ?? "[]") as string;
  const categoryIDList = JSON.parse(unparsedCategoryList);
  const unparsedSubCategoryList = (body.get("subCategoryIDList") ??
    "[]") as string;
  const subCategoryIDList = JSON.parse(unparsedSubCategoryList);
  //Return response if a field is missing

  if (
    !fileName.trim() ||
    !storeItemName.trim() ||
    !price ||
    !images ||
    !categoryIDList ||
    !subCategoryIDList ||
    !details.trim() ||
    !discountPercentage
  ) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }
  //Create object to validate
  const newStoreItem: StoreItemDB = {
    fileName: fileName,
    storeItemName: storeItemName,
    price: parseFloat(price),
    discountPercentage: parseInt(discountPercentage),
    imageNamesList: [],
    imageUrlList: [],
    details: details,
    mainImageIndex: parseInt(mainImageIndex),
    categoryIDList: categoryIDList,
    subCategoryIDList,
    secondaryImageIndex: parseInt(secondaryImageIndex),
  };

  try {
    validateNewStoreItem.parse(newStoreItem);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: error,
      },
      { status: 400 },
    );
  }

  //Verify that fileName is unique in the database
  try {
    await dbConnect();
    const existingItem = await StoreItemModel.findOne({ fileName: fileName });
    if (existingItem) {
      return NextResponse.json(
        {
          message: "File name already exists",
        },
        { status: 409 },
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "An error occurred verifying the file name",
      },
      { status: 500 },
    );
  }
  //Create presigned posts for each image
  let presignedPosts: PresignedPost[] = [];
  try {
    const presignedPostPromises = images.map(async (image) => {
      const fileExtension = image.name.split(".").pop() as string;
      const uuid = uuidv4();
      const name = `${uuid}.${fileExtension}`;

      const presignedPost = await createPresignedPost(AwsS3Client, {
        Bucket: process.env.S3_IMAGE_BUCKET_NAME,
        Key: name,
        Expires: 60 * 10, // Expires in 10 minutes
        Conditions: [
          ["content-length-range", 1, 1000000], // 1B to 1MB
        ],
      });

      const imageUrl = `https://${process.env.CLOUDFRONT_URL}/${uuid}.${fileExtension}`;

      return { imageUrl, name, presignedPost };
    });

    const results = await Promise.all(presignedPostPromises);
    presignedPosts = results.map((result) => result.presignedPost);
    newStoreItem.imageNamesList = results.map((result) => result.name);
    newStoreItem.imageUrlList = results.map((result) => result.imageUrl);
  } catch (error) {
    console.error("Error creating presigned posts:", error);
    return NextResponse.json(
      { message: "An error occurred uploading the images" },
      { status: 500 },
    );
  }
  // Sanitize details
  const clean = xss(newStoreItem.details);
  newStoreItem.details = clean;
  //If mainImageIndex is out of bounds, modify it to be 0
  if (
    newStoreItem.mainImageIndex >= newStoreItem.imageNamesList.length ||
    newStoreItem.mainImageIndex < 0
  ) {
    newStoreItem.mainImageIndex = 0;
  }
  //If secondaryImageIndex is out of bounds, modify it to be 0
  if (
    newStoreItem.secondaryImageIndex >= newStoreItem.imageNamesList.length ||
    newStoreItem.secondaryImageIndex < 0
  ) {
    newStoreItem.secondaryImageIndex = 0;
  }
  //Finally Store item to database
  try {
    await StoreItemModel.create(newStoreItem);

    return NextResponse.json({
      presignedPosts,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "An error occurred storing the item in the database",
      },
      { status: 500 },
    );
  }
}
