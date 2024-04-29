import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { OPTIONS } from "../api/auth/[...nextauth]/nextAuthOptions";
import { StoreItemModel } from "@/lib/models/storeItem";
import FreebiesPage from "@/components/pages/FreebiesPage";
import { StoreItemDB_ID } from "@/types/storeItemDB";

export default async function Freebies() {
  const session = await getServerSession(OPTIONS);
  await dbConnect();
  //Freebies are going to be items that are either free or have a 100% discount
  const freebies = await StoreItemModel.find({
    $or: [{ price: 0 }, { discountPercentage: 100 }],
  });
  const freebieList = JSON.parse(JSON.stringify(freebies)) as StoreItemDB_ID[]; //parse and stringify to remove mongoose methods
  return <FreebiesPage freebies={freebieList} session={session} />;
}
