import { OPTIONS } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import IndividualCutFileProduct from "@/components/pages/IndividualCutFileProduct";
import dbConnect from "@/lib/dbConnect";
import { StoreItemModel } from "@/lib/models/storeItem";
import { getServerSession } from "next-auth";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    const session = await getServerSession(OPTIONS);
    await dbConnect();
    const findItem = await StoreItemModel.findById(params.id);
    const plainJsonStoreItems = JSON.parse(JSON.stringify(findItem));
    if (!findItem) {
      return <div>Producto No Encontrado</div>;
    }
    return (
      <IndividualCutFileProduct
        storeItem={plainJsonStoreItems}
        session={session}
      />
    );
  } catch (error) {
    console.error(error);
    return <div>Producto No Encontrado</div>;
  }
}
