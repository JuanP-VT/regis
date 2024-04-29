import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { OPTIONS } from "../api/auth/[...nextauth]/nextAuthOptions";
import { StoreItemModel } from "@/lib/models/storeItem";
import FreebiesPage from "@/components/pages/FreebiesPage";
import { StoreItemDB_ID } from "@/types/storeItemDB";
import { Category_ID } from "@/types/category";
import { categoryModel } from "@/lib/models/category";

export default async function Freebies() {
  try {
    const session = await getServerSession(OPTIONS);
    await dbConnect();
    //Freebies are items that are free; price is 0 or discount is 100%
    const freebies = await StoreItemModel.find({
      $or: [{ price: 0 }, { discountPercentage: 100 }],
    });
    const freebieList = JSON.parse(
      JSON.stringify(freebies),
    ) as StoreItemDB_ID[]; //parse and stringify to remove mongoose methods
    const categoryData = (await categoryModel.find({}).lean()) as Category_ID[];
    const categoryList = JSON.parse(JSON.stringify(categoryData));
    return (
      <FreebiesPage
        freebies={freebieList}
        session={session}
        categoryList={categoryList}
      />
    );
  } catch (error) {
    console.error(error);
    return <div>Algo salió mal</div>;
  }
}
