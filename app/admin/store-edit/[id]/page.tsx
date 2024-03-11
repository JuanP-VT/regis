import { OPTIONS } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import AdminNav from "@/components/composed/AdminNav";
import StoreItemEditPage from "@/components/pages/admin/StoreItemEditPage";
import dbConnect from "@/lib/dbConnect";
import { StoreItemModel } from "@/lib/models/storeItem";
import { Category_ID } from "@/types/category";
import { StoreItemDB_ID } from "@/types/storeItemDB";
import { Role } from "@/types/user";
import { isValidObjectId } from "mongoose";
import { getServerSession } from "next-auth";

export default async function EditStoreItem({
  params,
}: {
  params: { id: string };
}) {
  try {
    const session = await getServerSession(OPTIONS);
    if (!session || session.user.role !== Role.ADMIN) {
      return <div>Unauthorized</div>;
    }
  } catch (error) {
    return <div>Error en la autentificación</div>;
  }

  //Search if param is valid item in db
  const isValidId = isValidObjectId(params.id);
  if (!isValidId) {
    return <div>Invalid ID</div>;
  }

  try {
    await dbConnect();
    const findInDb: StoreItemDB_ID | null = await StoreItemModel.findById(
      params.id,
    );

    const data = JSON.parse(JSON.stringify(findInDb)) as StoreItemDB_ID;

    const reqCategories = await fetch(`${process.env.URL}/api/categories`);
    const categoryList = (await reqCategories.json()) as Category_ID[];
    categoryList.sort((a, b) => a.name.localeCompare(b.name));

    return (
      <>
        <AdminNav />
        <StoreItemEditPage storeItem={data} categoryList={categoryList} />;
      </>
    );
  } catch (error) {
    console.error();
    return <div>Error finding item</div>;
  }
}
