import { getServerSession } from "next-auth";
import { OPTIONS } from "../api/auth/[...nextauth]/nextAuthOptions";
import { StoreItemModel } from "@/lib/models/storeItem";
import dbConnect from "@/lib/dbConnect";
import { StoreItemDB_ID } from "@/types/storeItemDB";
import SalesPage from "@/components/pages/SalesPage";
import { categoryModel } from "@/lib/models/category";
import { Category_ID } from "@/types/category";
export default async function Sales() {
  const session = await getServerSession(OPTIONS);
  await dbConnect();
  const items = (await StoreItemModel.find({
    price: { $gt: 0 },
    discountPercentage: { $gte: 1, $lte: 99 },
  })) as StoreItemDB_ID[];
  const categoryData = (await categoryModel.find({}).lean()) as Category_ID[];
  const categoryList = JSON.parse(JSON.stringify(categoryData));
  return (
    <SalesPage
      items={JSON.parse(JSON.stringify(items))}
      categoryList={categoryList}
    />
  );
}
