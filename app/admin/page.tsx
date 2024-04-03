import { getServerSession } from "next-auth";
import { OPTIONS } from "@/app/api/auth/[...nextauth]/nextAuthOptions";

import { Role } from "@/types/user";
import StoreItemsDisplay from "@/components/pages/admin/StoreItemsDisplay";
import { StoreItemDB_ID } from "@/types/storeItemDB";
import AdminNav from "@/components/composed/AdminNav";
import { Category_ID } from "@/types/category";
import { StoreItemModel } from "@/lib/models/storeItem";
import { categoryModel } from "@/lib/models/category";
import dbConnect from "@/lib/dbConnect";

export default async function Admin() {
  try {
    const session = await getServerSession(OPTIONS);
    if (!session || session.user.role !== Role.ADMIN) {
      return <div>Unauthorized</div>;
    }
  } catch (error) {
    return <div>Error en la autentificación</div>;
  }

  try {
    //Fetch store items from the database
    //Transform mongoose documents to plain objects
    await dbConnect();
    const data = await StoreItemModel.find({});
    const storeItems = JSON.parse(JSON.stringify(data)) as StoreItemDB_ID[];
    const categoryData = await categoryModel.find({}).lean();
    const categoryList = JSON.parse(
      JSON.stringify(categoryData),
    ) as Category_ID[];
    return (
      <div>
        <AdminNav />
        <StoreItemsDisplay
          storeItems={storeItems}
          categoryList={categoryList}
        />
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div>Error en el servidor</div>;
  }
}
