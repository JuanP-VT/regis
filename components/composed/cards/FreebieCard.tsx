import { Button } from "@/components/ui/button";
import Link from "next/link";
import { StoreItemDB_ID } from "@/types/storeItemDB";
import Image from "next/image";
import { Session } from "next-auth";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  storeItem: StoreItemDB_ID;
  session: Session | null;
};

export default function FreebieCard({ storeItem, session }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const userHasFreebie = session?.user.freebies.includes(storeItem.fileName);
  async function handleRequest() {
    setIsLoading(true);
    const res = await fetch("/api/claim-freebie/", {
      method: "POST",
      body: JSON.stringify({ itemId: storeItem._id }),
    });
    const data = await res.json();
    toast("", {
      description: `${data.message}`,
      action: {
        label: "Cerrar",
        onClick: () => {},
      },
    });
    setIsLoading(false);
    setTimeout(() => {
      location.reload();
    }, 1000);
  }
  return (
    <div className="sm:h-80 sm:w-96 ">
      <div className="group relative h-60 w-80 cursor-pointer overflow-hidden sm:w-full">
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

        <Button
          disabled={isLoading || userHasFreebie}
          className="absolute bottom-0 w-full -translate-x-96 bg-rose-300 transition-all duration-500 hover:bg-rose-400 group-hover:-translate-x-0"
          onClick={() => handleRequest()}
        >
          {userHasFreebie ? "Freebie Reclamado" : "Reclamar Freebie"}
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
        <Link href={`/product/${storeItem._id}`}>
          <Button
            size={"sm"}
            className="bg-rose-300 p-2 px-5 text-xs hover:bg-rose-400"
          >
            Ver Detalles
          </Button>
        </Link>
      </div>
    </div>
  );
}
