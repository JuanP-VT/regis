import IndividualCutFileProduct from "@/components/pages/IndividualCutFileProduct";
import dbConnect from "@/lib/dbConnect";
import { StoreItemModel } from "@/lib/models/storeItem";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  try {
    await dbConnect();
    const findItem = await StoreItemModel.findById(params.id);
    const plainJsonStoreItems = JSON.parse(JSON.stringify(findItem));
    if (!findItem) {
      return <div>Producto No Encontrado</div>;
    }
    return <IndividualCutFileProduct storeItem={plainJsonStoreItems} />;
  } catch (error) {
    console.error(error);
    return <div>Producto No Encontrado</div>;
  }
}
