import { OPTIONS } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import NewStoreItemPage from "@/components/pages/admin/NewStoreItemPage";
import { Role } from "@/types/user";
import { getServerSession } from "next-auth";
import { AwsS3Client } from "@/lib/awsS3Client";
import { ListObjectsV2Command } from "@aws-sdk/client-s3";
import { StoreItemDB_ID } from "@/types/storeItemDB";
import AdminNav from "@/components/composed/AdminNav";
import { Category_ID } from "@/types/category";
import { StoreItemModel } from "@/lib/models/storeItem";
import { categoryModel } from "@/lib/models/category";
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

  let filteredKeyList: (string | undefined)[] | undefined;
  try {
    const command = new ListObjectsV2Command({
      Bucket: process.env.S3_FILES_BUCKET_NAME,
    });
    const response = await AwsS3Client.send(command);
    const fileNameList = response.Contents?.map((content) => content.Key);
    //Filter files that are already associated with a store item
    const data = await StoreItemModel.find({});
    const storeItems = JSON.parse(JSON.stringify(data)) as StoreItemDB_ID[];

    //Return the list of files that are not associated with a store item
    filteredKeyList = fileNameList?.filter(
      (fileName) =>
        !storeItems.some((storeItem) => storeItem.fileName === fileName),
    );
  } catch (err) {
    console.error(err);
    return <p>There was an error</p>;
  }
  let categoryList: Category_ID[];
  try {
    const data = await categoryModel.find({}).lean();
    categoryList = JSON.parse(JSON.stringify(data)) as Category_ID[];
    categoryList.sort((a, b) => a.name.localeCompare(b.name));
  } catch (error) {
    return <p>There was an error getting categories</p>;
  }
  return (
    <>
      <AdminNav />
      <NewStoreItemPage
        filesKeyList={filteredKeyList}
        categoryList={categoryList}
      />
      ;
    </>
  );
}
