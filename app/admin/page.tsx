import { getServerSession } from "next-auth";
import { OPTIONS } from "@/app/api/auth/[...nextauth]/nextAuthOptions";

import { Role } from "@/types/user";
import StoreItemsDisplay from "@/components/pages/admin/StoreItemsDisplay";
import { StoreItemDB_ID } from "@/types/storeItemDB";
import AdminNav from "@/components/composed/AdminNav";
import { Category_ID } from "@/types/category";

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
    const res = await fetch(`${process.env.URL}/api/store`);
    const data = (await res.json()) as StoreItemDB_ID[] | undefined;

    const reqCategory = await fetch(`${process.env.URL}/api/categories`);
    const categoryList = (await reqCategory.json()) as
      | Category_ID[]
      | undefined;

    return (
      <div>
        <AdminNav />
        <StoreItemsDisplay storeItems={data} categoryList={categoryList} />
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div>Error en el servidor</div>;
  }
}
