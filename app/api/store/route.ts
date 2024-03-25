import { validateNewStoreItem } from "@/lib/schema-validators/admin-new-storeitem";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { OPTIONS } from "../auth/[...nextauth]/nextAuthOptions";
import { Upload } from "@aws-sdk/lib-storage";
import { v4 as uuidv4 } from "uuid";
import { AwsS3Client } from "@/lib/awsS3Client";
import { StoreItemModel } from "@/lib/models/storeItem";
import { StoreItemDB } from "@/types/storeItemDB";
import xss from "xss";
import { Role } from "@/types/user";

//Fetch all store items from database
export async function GET() {
  try {
    const session = await getServerSession(OPTIONS);
    if (!session || session.user.role !== Role.ADMIN) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "An error ocurred authenticating the user",
      },
      { status: 500 },
    );
  }
  try {
    const storeItems = (await StoreItemModel.find({})) as StoreItemDB[];
    return NextResponse.json(storeItems);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "An error occurred fetching the store items",
      },
      { status: 500 },
    );
  }
}
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
    !mainImageIndex ||
    !details.trim() ||
    !discountPercentage
  ) {
    return NextResponse.json({ message: "Missing fields" }, { status: 400 });
  }
  //Validate the input

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
  const validationResult = validateNewStoreItem.safeParse(newStoreItem);

  if (!validationResult.success) {
  }
  //Verify that fileName is unique in the database
  const existingItem = await StoreItemModel.findOne({ fileName: fileName });
  if (existingItem) {
    return NextResponse.json(
      {
        message: "File name already exists",
      },
      { status: 409 },
    );
  }
  //Upload images to S3
  try {
    const uploadPromises = images.map(async (image) => {
      const fileExtension = image.name.split(".").pop() as string;
      const uuid = uuidv4();
      const name = `${uuid}.${fileExtension}`;
      const command = {
        Bucket: process.env.S3_IMAGE_BUCKET_NAME,
        Key: name,
        Body: image.stream(),
      };

      const upload = new Upload({ client: AwsS3Client, params: command });
      await upload.done();
      const imageUrl = `https://${process.env.CLOUDFRONT_URL}/${uuid}.${fileExtension}`;

      return { imageUrl, name };
    });

    const results = await Promise.all(uploadPromises);

    newStoreItem.imageNamesList = results.map((result) => result.name);
    newStoreItem.imageUrlList = results.map((result) => result.imageUrl);
  } catch (error) {
    console.error("Error uploading images:", error);
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

  //Finally Store item to database
  try {
    await StoreItemModel.create(newStoreItem);

    return NextResponse.json({ message: "success" });
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
