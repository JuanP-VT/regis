import { Button } from "@/components/ui/button";
import { Category_ID } from "@/types/category";
import { StoreItemDB_ID } from "@/types/storeItemDB";
import Image from "next/image";

type Props = {
  storeItem: StoreItemDB_ID;
};

export default function CatalogItemCard({ storeItem }: Props) {
  return (
    <div className=" h-80 w-80">
      <div className="group relative h-60 cursor-pointer overflow-hidden">
        <Image
          className=" h-full w-full self-center rounded-sm"
          src={storeItem.imageUrlList[storeItem.mainImageIndex]}
          alt="Store Display View"
          width={500}
          height={500}
        />
        <Button className="absolute bottom-0 w-full -translate-x-96 text-sm transition-all duration-300 group-hover:-translate-x-0">
          Agregar Al Carrito
        </Button>
      </div>
      <p className="text-center text-xs">{storeItem.storeItemName}</p>
      <div className="mt-2">
        {storeItem.discountPercentage > 0 ? (
          <p className="text-center text-sm">
            {(
              storeItem.price -
              (storeItem.price * storeItem.discountPercentage) / 100
            ).toFixed(2)}
            $MX
          </p>
        ) : (
          <p className="text-center text-sm">{storeItem.price.toFixed(2)}$MX</p>
        )}
      </div>
    </div>
  );
}
