import { getServerSession } from "next-auth";
import { OPTIONS } from "../auth/[...nextauth]/route";
import { AwsS3Client } from "@/lib/awsS3Client";
import { Upload } from "@aws-sdk/lib-storage";
import { ValidateNewFileApi } from "@/lib/schema-validators/admin-cutfile-new";
import { NextResponse } from "next/server";

/**
 * Pending, rate limit!!
 * Pending, Docs
 */
export async function POST(req: Request) {
  try {
    const session = await getServerSession(OPTIONS);
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }
    // Extract the file from the request
    const formData = await req.formData();
    const file = formData.get("file") as File;
    //Validate request
    const unParsedData = { file };
    const { success } = ValidateNewFileApi.safeParse(unParsedData);

    if (!success) {
      return NextResponse.json({ message: "Invalid request" });
    }

    // Upload the file to the S3 bucket
    const command = {
      Bucket: "regis-app-files",
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
    return NextResponse.json({ message: "An error occurred" });
  }
}
