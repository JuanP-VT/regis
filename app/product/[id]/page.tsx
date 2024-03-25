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
    if (!findItem) {
      return <div>Producto No Encontrado</div>;
    }
    return <IndividualCutFileProduct storeItem={findItem} />;
  } catch (error) {
    console.error(error);
    return <div>Producto No Encontrado</div>;
  }
}
