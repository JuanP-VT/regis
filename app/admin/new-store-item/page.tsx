import { OPTIONS } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import NewStoreItemPage from "@/components/pages/admin/NewStoreItemPage";
import { Role } from "@/types/user";
import { getServerSession } from "next-auth";
import { AwsS3Client } from "@/lib/awsS3Client";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { StoreItemDB } from "@/types/storeItemDB";
import AdminNav from "@/components/composed/AdminNav";
export default async function NewStoreItem() {
  try {
    const session = await getServerSession(OPTIONS);
    if (!session || session.user.role !== Role.ADMIN) {
      return <div>Unauthorized</div>;
    }
  } catch (error) {
    return <div>Error en la autentificación</div>;
  }

  //We need to get the list of files from the s3 bucket so admin can select them
  //We also have filters files that already associated with a store item to avoid duplicates

  const command = new ListObjectsV2Command({
    Bucket: process.env.S3_FILES_BUCKET_NAME,
  });
  try {
    const response = await AwsS3Client.send(command);
    const fileNameList = response.Contents?.map((content) => content.Key);
    //Filter files that are already associated with a store item
    const storeItems = await fetch(`${process.env.URL}/api/store`);
    const storeItemsJson = (await storeItems.json()) as StoreItemDB[];
    //Return the list of files that are not associated with a store item
    const filteredKeyList = fileNameList?.filter(
      (fileName) =>
        !storeItemsJson.some((storeItem) => storeItem.fileName === fileName),
    );

    return (
      <>
        <AdminNav />
        <NewStoreItemPage filesKeyList={filteredKeyList} />;
      </>
    );
  } catch (err) {
    console.error(err);
    return <p>There was an error</p>;
  }
}
