import { validateNewStoreItem } from "@/lib/schema-validators/admin-new-storeitem";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { OPTIONS } from "../auth/[...nextauth]/nextAuthOptions";
import { Upload } from "@aws-sdk/lib-storage";
import { v4 as uuidv4 } from "uuid";
import { AwsS3Client } from "@/lib/awsS3Client";
import { StoreItemModel } from "@/lib/models/storeItem";
import { StoreItemDB } from "@/types/storeItemDB";

export async function POST(req: Request) {
  const session = await getServerSession(OPTIONS);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized", status: 401 });
  }
  const body = await req.formData();
  const fileName = body.get("fileName") as string;
  const storeItemName = body.get("storeItemName") as string;
  const price = body.get("price") as string;
  const discountPercentage = body.get("discountPercentage") as string;
  const images = body.getAll("images") as File[];
  const mainImageIndex = body.get("mainImageIndex") as string;
  const details = body.get("details") as string;
  //Return response if a field is missing
  if (
    !fileName ||
    !storeItemName ||
    !price ||
    !images ||
    !mainImageIndex ||
    !details ||
    !discountPercentage
  ) {
    return NextResponse.json({ message: "Missing fields", status: 400 });
  }
  //Validate the input
  const newStoreItem: StoreItemDB = {
    fileName: fileName,
    storeItemName: storeItemName,
    price: parseFloat(price),
    discountPercentage: parseInt(discountPercentage),
    imageNamesList: [],
    details: details,
    mainImageIndex: parseInt(mainImageIndex),
  };

  const validationResult = validateNewStoreItem.safeParse(newStoreItem);

  if (!validationResult.success) {
    return NextResponse.json({
      message: validationResult.error.message,
      status: 400,
    });
  }
  //Verify that fileName is unique in the database
  const existingItem = await StoreItemModel.findOne({ fileName: fileName });
  if (existingItem) {
    return NextResponse.json({
      message: "File name already exists",
      status: 400,
    });
  }
  //Upload images to s3 bucket and store their name into the database
  const imagesUrl: string[] = [];

  for (const image of images) {
    const uuid = uuidv4();
    const command = {
      Bucket: "regis-container",
      Key: uuid,
      Body: image.stream(),
    };
    try {
      const upload = new Upload({ client: AwsS3Client, params: command });
      await upload.done();
      imagesUrl.push(uuid);
    } catch (error) {
      return NextResponse.json({
        message: "An error occurred uploading image",
      });
    }
  }
  newStoreItem.imageNamesList = imagesUrl;
  //Store item to database
  try {
    await StoreItemModel.create(newStoreItem);
    return NextResponse.json({ message: "success", status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "An error occurred storing the item" });
  }
}
