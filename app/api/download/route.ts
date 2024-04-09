import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import z from "zod";
import { OPTIONS } from "../auth/[...nextauth]/nextAuthOptions";
import { purchaseOrderModel } from "@/lib/models/purchaseOrder";
import { PurchaseOrder } from "@/types/PurchaseOrder";
import { AwsS3Client } from "@/lib/awsS3Client";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dbConnect from "@/lib/dbConnect";
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
  await dbConnect();
  const userPurchaseOrders = (await purchaseOrderModel.find({
    userID: session.user._id,
  })) as PurchaseOrder[];

  const findOrder = userPurchaseOrders
    .flatMap((order) => order.purchaseUnits)
    .find((unit) => unit.referenceID === fileName);
  if (!findOrder) {
    return NextResponse.json(
      { message: "No tienes acceso a este archivo" },
      { status: 403 },
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
