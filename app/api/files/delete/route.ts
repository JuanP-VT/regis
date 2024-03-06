//Route to handle delete file request

import { NextResponse } from "next/server";
import { DeleteObjectCommand, DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { AwsS3Client } from "@/lib/awsS3Client";
import { StoreItemModel } from "@/lib/models/storeItem";
import { StoreItemDB } from "@/types/storeItemDB";

/**
 * The deletion process involves three steps:
 * 1. Deleting the associated images in the S3 bucket.
 * 2. Deleting the file reference in the database. (optional, might not have)
 * 3. Deleting the file in the S3 bucket. (optional, might not have)
 *
 * This order is important to maintain consistency. If any step fails, the operation can be retried without losing references. This ensures that no orphaned images are left in the S3 bucket.
 */
export async function POST(req: Request) {
  const body = await req.json();
  const { fileName } = body;

  if (!fileName && typeof fileName !== "string" && fileName !== "") {
    return NextResponse.json(
      { error: "File name is required" },
      { status: 400 }
    );
  }
  // Find file reference in database
  let imageFileName: string[] = [];
  let find: StoreItemDB | null = null;
  try {
    find = (await StoreItemModel.findOne({
      fileName,
    })) as StoreItemDB | null;
  } catch (error) {
    return NextResponse.json(
      { message: "Error finding document in database" },
      { status: 500 }
    );
  }

  if (find) {
    try {
      //Delete images associated with the file store reference
      imageFileName = find.imageNamesList;
      const keyList = imageFileName.map((name) => ({ Key: name }));
      const command = new DeleteObjectsCommand({
        Bucket: process.env.S3_IMAGE_BUCKET_NAME,
        Delete: { Objects: keyList },
      });
      await AwsS3Client.send(command);
    } catch (error) {
      return NextResponse.json(
        { error: "Error deleting images in bucket" },
        { status: 500 }
      );
    }
    //Delete database reference
    try {
      await StoreItemModel.deleteOne({ fileName });
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Error deleting document in database" },
        { status: 500 }
      );
    }
  }

  // Finally remove file from S3 bucket
  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.S3_FILES_BUCKET_NAME,
      Key: fileName,
    });
    await AwsS3Client.send(command);
    return NextResponse.json({ message: "File deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error deleting file in bucket" },
      { status: 500 }
    );
  }
}
