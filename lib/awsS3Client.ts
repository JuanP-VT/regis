//This file is used to create an instance of the S3Client from the @aws-sdk/client-s3 package and export it as AwsS3Client.
import { S3Client } from "@aws-sdk/client-s3";
export const AwsS3Client = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});
