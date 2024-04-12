import { getServerSession } from "next-auth";
import { OPTIONS } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import { AwsS3Client } from "@/lib/awsS3Client";

import { NextResponse } from "next/server";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { Role } from "@/types/user";
/**
 * Pending, rate limit!!
 * Pending, Docs
 */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(OPTIONS);
    if (!session || session.user?.role !== Role.ADMIN) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }
    // Extract the file from the request
    const formData = await req.formData();
    //Create File type Since unlike vercel AWS cant read browser objects in server side
    type FILE = {
      name: string;
      size: number;
      stream: () => ReadableStream<Uint8Array>;
    };
    const file = formData.get("file") as FILE;

    //Check if filename already exist in s3 bucket
    const listObjects = new ListObjectsV2Command({
      Bucket: process.env.S3_FILES_BUCKET_NAME,
    });
    const listObjectsResult = await AwsS3Client.send(listObjects);
    if (
      listObjectsResult.Contents?.find((object) => object.Key === file.name)
    ) {
      return NextResponse.json(
        { message: "El nombre del archivo ya existe" },
        { status: 409 },
      );
    }
    // Generate pre-signed POST data
    const presignedPost = await createPresignedPost(AwsS3Client, {
      Bucket: process.env.S3_FILES_BUCKET_NAME,
      Key: file.name,
      Expires: 60 * 10, // Expires in 10 minutes
      Conditions: [
        ["content-length-range", 1, 1000000], // 1B to 1MB
      ],
    });

    return NextResponse.json({
      presignedPost,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
