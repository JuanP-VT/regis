type Props = {};
import { OPTIONS } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import AdminNav from "@/components/composed/AdminNav";
import FilesPage from "@/components/pages/admin/FilesPage";
import { AwsS3Client } from "@/lib/awsS3Client";
import { Role } from "@/types/user";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { getServerSession } from "next-auth";

export default async function AllFiles({}: Props) {
  try {
    const session = await getServerSession(OPTIONS);
    if (!session || session.user.role !== Role.ADMIN) {
      return <div>Unauthorized</div>;
    }
  } catch (error) {
    return <div>Error en la autentificación</div>;
  }

  //Fetch files from s3
  try {
    const command = await AwsS3Client.send(
      new ListObjectsV2Command({ Bucket: process.env.S3_FILES_BUCKET_NAME }),
    );
    //get array of files
    const files = command.Contents;
    return (
      <>
        <AdminNav />
        <FilesPage files={files} />
      </>
    );
  } catch (error) {
    return <div>Error</div>;
  }
}
