import { validateNewStoreItem } from "@/lib/schema-validators/admin-new-storeitem";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { OPTIONS } from "../auth/[...nextauth]/nextAuthOptions";
import { Upload } from "@aws-sdk/lib-storage";
import { v4 as uuidv4 } from "uuid";
import { AwsS3Client } from "@/lib/awsS3Client";
import { StoreItemModel } from "@/lib/models/storeItem";
import { StoreItemDB } from "@/types/storeItemDB";
import { ObjectCannedACL, DeleteObjectCommand } from "@aws-sdk/client-s3";
import xss from "xss";
//Fetch all store items from database
export async function GET() {
  try {
    const storeItems = (await StoreItemModel.find({})) as StoreItemDB[];

    return NextResponse.json(storeItems);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "An error occurred fetching the store items",
      },
      { status: 500 }
    );
  }
}
//Create a new store item
export async function POST(req: Request) {
  const session = await getServerSession(OPTIONS);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const body = await req.formData();
  // We cast types to string because we are going to validate them anyway
  const fileName = body.get("fileName") as string;
  const storeItemName = body.get("storeItemName") as string;
  const price = body.get("price") as string;
  const discountPercentage = body.get("discountPercentage") as string;
  const images = body.getAll("images") as File[];
  const mainImageIndex = body.get("mainImageIndex") as string;
  const details = body.get("details") as string;
  //Return response if a field is missing

  if (
    !fileName.trim() ||
    !storeItemName.trim() ||
    !price ||
    !images ||
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
  };

  const validationResult = validateNewStoreItem.safeParse(newStoreItem);

  if (!validationResult.success) {
    return NextResponse.json(
      {
        message: validationResult.error.message,
      },
      { status: 400 }
    );
  }
  //Verify that fileName is unique in the database
  const existingItem = await StoreItemModel.findOne({ fileName: fileName });
  if (existingItem) {
    return NextResponse.json(
      {
        message: "File name already exists",
      },
      { status: 400 }
    );
  }

  // Upload images to S3 bucket and store their name into the database
  const imageNames: string[] = [];
  const imageUrls: string[] = [];
  try {
    for (const image of images) {
      const fileExtension = image.name.split(".").pop() as string;
      const uuid = uuidv4();
      const command = {
        Bucket: "regis-container",
        Key: `${uuid}.${fileExtension}`,
        Body: image.stream(),
        ACL: ObjectCannedACL.public_read,
      };

      const upload = new Upload({ client: AwsS3Client, params: command });
      await upload.done();
      const imageUrl = `https://regis-container.s3.amazonaws.com/${uuid}.${fileExtension}`;
      imageUrls.push(imageUrl);
      imageNames.push(uuid);
    }
    newStoreItem.imageNamesList = imageNames;
    newStoreItem.imageUrlList = imageUrls;

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

    // Store item to database
    await StoreItemModel.create(newStoreItem);

    return NextResponse.json({ message: "success" });
  } catch (error) {
    console.error(error);
    // Delete uploaded images from S3
    for (const imageName of imageNames) {
      const deleteParams = {
        Bucket: "regis-container",
        Key: imageName,
      };
      await AwsS3Client.send(new DeleteObjectCommand(deleteParams));
    }
    return NextResponse.json(
      {
        message: "An error occurred storing the item",
      },
      { status: 500 }
    );
  }
}
