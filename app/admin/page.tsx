import { getServerSession } from "next-auth";
import { OPTIONS } from "@/app/api/auth/[...nextauth]/nextAuthOptions";

import { Role } from "@/types/user";
import StoreItemsDisplay from "@/components/pages/admin/StoreItemsDisplay";
import { StoreItemDB_ID } from "@/types/storeItemDB";
import AdminNav from "@/components/composed/AdminNav";

export default async function Admin() {
  const session = await getServerSession(OPTIONS);
  const user = session?.user;

  if (!session || user?.role !== Role.ADMIN) {
    return <div>Unauthorized</div>;
  }
  //Fetch store items from the database
  const res = await fetch(`${process.env.URL}/api/store`);
  const data = (await res.json()) as StoreItemDB_ID[];

  return (
    <div>
      <AdminNav />
      <StoreItemsDisplay storeItems={data} />
    </div>
  );
}
