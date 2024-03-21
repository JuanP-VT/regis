import { Button } from "@/components/ui/button";
import { StoreItemDB_ID } from "@/types/storeItemDB";
import Image from "next/image";

type Props = {
  storeItem: StoreItemDB_ID;
};

export default function CatalogItemCard({ storeItem }: Props) {
  return (
    <div className=" h-72 w-52">
      <div className="group relative cursor-pointer overflow-x-hidden">
        <Image
          className="h-52  rounded-sm object-cover"
          src={storeItem.imageUrlList[storeItem.mainImageIndex]}
          alt="Store Display View"
          width={208}
          height={208}
        />
        <Button className="absolute bottom-0 w-full -translate-x-52 text-sm transition-all duration-300 group-hover:-translate-x-0">
          Agregar Al Carrito
        </Button>
      </div>
      <p className="text-center text-xs">{storeItem.storeItemName}</p>
      <div className="mt-2">
        {storeItem.discountPercentage > 0 ? (
          <p className="text-center text-sm">
            {storeItem.price - storeItem.price * storeItem.discountPercentage}
            $MX
          </p>
        ) : (
          <p className="text-center text-sm">{storeItem.price}$MX</p>
        )}
      </div>
    </div>
  );
}
