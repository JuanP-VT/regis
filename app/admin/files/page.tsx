type Props = {};
import FilesPage from "@/components/pages/admin/FilesPage";
import { AwsS3Client } from "@/lib/awsS3Client";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
export default async function AllFiles({}: Props) {
  //Fetch files from s3

  try {
    const command = await AwsS3Client.send(
      new ListObjectsV2Command({ Bucket: "regis-app-files" })
    );
    //get array of files
    const files = command.Contents;
    return <FilesPage files={files} />;
  } catch (error) {
    return <div>Error</div>;
  }
}
