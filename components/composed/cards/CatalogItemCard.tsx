import { Button } from "@/components/ui/button";
import Link from "next/link";
import { StoreItemDB_ID } from "@/types/storeItemDB";
import Image from "next/image";
import addToShoppingCart from "@/utils/addToShoppingCart";
import AddToShoppingCartButton from "@/components/AddToShoppingCartButton";

type Props = {
  storeItem: StoreItemDB_ID;
};

export default function CatalogItemCard({ storeItem }: Props) {
  return (
    <div className=" h-80 w-96 ">
      <div className="group  relative h-60 cursor-pointer overflow-hidden">
        <Link href={`/product/${storeItem._id}`}>
          <Image
            className=" absolute -z-10 h-auto w-auto self-center rounded-sm   opacity-100 transition duration-1000 ease-in-out group-hover:opacity-0"
            src={storeItem.imageUrlList[storeItem.mainImageIndex]}
            alt="Store Display View"
            width={900}
            height={900}
          />
          <Image
            className=" absolute -z-10 h-auto w-auto self-center rounded-sm opacity-0 transition duration-1000 ease-in-out group-hover:scale-110
             group-hover:opacity-100"
            src={storeItem.imageUrlList[storeItem.secondaryImageIndex]}
            alt="Store Display View"
            width={900}
            height={900}
          />
        </Link>

        <AddToShoppingCartButton storeItem={storeItem} />
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
        <Link href={`/product/${storeItem._id}`}>
          {" "}
          <Button
            size={"sm"}
            className="bg-pink-300 p-2 px-5 text-xs hover:bg-pink-500"
          >
            Ver Detalles
          </Button>
        </Link>
      </div>
    </div>
  );
}
