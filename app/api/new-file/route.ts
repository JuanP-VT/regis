import { getServerSession } from "next-auth";
import { OPTIONS } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import { AwsS3Client } from "@/lib/awsS3Client";
import { Upload } from "@aws-sdk/lib-storage";
import { ValidateNewFileApi } from "@/lib/schema-validators/admin-new-file";
import { NextResponse } from "next/server";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
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
    //Validate request
    const unParsedData = { file };
    const { success } = ValidateNewFileApi.safeParse(unParsedData);

    if (!success) {
      return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }
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
    // Upload the file to the S3 bucket
    const command = {
      Bucket: process.env.S3_FILES_BUCKET_NAME,
      Key: file.name,
      Body: file.stream(),
      Metadata: {
        "Content-Length": file.size.toString(),
        "Content-Group": file.name,
      },
    };
    const upload = new Upload({ client: AwsS3Client, params: command });

    const data = await upload.done();
    return NextResponse.json({ message: "File uploaded successfully", data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
