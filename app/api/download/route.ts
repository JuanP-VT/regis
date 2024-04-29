import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import z from "zod";
import { OPTIONS } from "../auth/[...nextauth]/nextAuthOptions";
import { AwsS3Client } from "@/lib/awsS3Client";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/lib/models/user";
import { User_ID } from "@/types/user";
export async function POST(req: Request) {
  //Authenticate user
  const session = await getServerSession(OPTIONS);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  //Get body
  const body = await req.json();
  const { fileName } = body;

  //Validate input
  const inputValidator = z.object({
    fileName: z.string().min(1).max(255),
  });
  try {
    inputValidator.parse({ fileName });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: error.errors }, { status: 400 });
    } else {
      return NextResponse.json(
        { message: "Error al validar la entrada" },
        { status: 500 },
      );
    }
  }
  //Check that user has purchased the file
  try {
    await dbConnect();
    const user = (await UserModel.findById(session.user._id)) as User_ID | null;
    const userHasProduct =
      user?.purchasedItems.includes(fileName) ||
      user?.freebies.includes(fileName);

    if (!userHasProduct) {
      return NextResponse.json(
        { message: "No tienes acceso a este archivo" },
        { status: 403 },
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error al conectar a la base de datos" },
      { status: 500 },
    );
  }
  //Connect to s3 bucket and download file
  //Fetch files from s3
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.S3_FILES_BUCKET_NAME,
      Key: fileName,
    });
    const signedUrl = await getSignedUrl(AwsS3Client, command, {
      expiresIn: 120,
    });
    return NextResponse.json({ url: signedUrl });
  } catch (error) {
    return NextResponse.json(
      { message: "Error al descargar el archivo" },
      { status: 500 },
    );
  }
}
