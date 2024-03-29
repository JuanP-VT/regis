"use client";
import { StoreItemDB_ID } from "@/types/storeItemDB";
import ShoppingCart from "@/utils/classes/ShoppingCart";
import { useEffect, useState } from "react";
import { TruckIcon, PackageIcon } from "lucide-react";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import {
  CardContent,
  CardFooter,
  Card,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  const [showMessage, setShowMessage] = useState(false);
  const [purchasedItems, setPurchasedItems] = useState<StoreItemDB_ID[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [numberOfPieces, setNumberOfPieces] = useState(350);
  const { width, height } = useWindowSize();
  useEffect(() => {
    const recentPurchase = localStorage.getItem("regis-recent-purchase");
    if (recentPurchase === "true") {
      const cart = new ShoppingCart();
      setPurchasedItems(cart.getCart());
      setTotalPrice(cart.getTotalCost());
      setShowMessage(true);
      // localStorage.setItem("regis-recent-purchase", "false");

      setTimeout(() => {
        setNumberOfPieces(20);
      }, 10000);
    }
  }, []);
  if (!showMessage) {
    return <div>Not Found</div>;
  }

  return (
    <div className="mx-auto grid max-w-3xl items-start gap-4 p-3 px-4">
      {
        <Confetti
          width={width}
          height={height}
          gravity={0.07}
          numberOfPieces={numberOfPieces}
          run={true}
        />
      }
      <div className="flex items-center gap-4">
        <PackageIcon className="h-6 w-6" />
        <div className="text-lg font-semibold">Orden Completada</div>
        <div className="ml-auto text-sm text-gray-500 dark:text-gray-400">
          Fecha:{" "}
          {new Date(Date.now()).toLocaleString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
      <Card>
        <CardContent className="grid gap-4 p-2">
          {purchasedItems.map((item, index) => (
            <div key={`itm` + index} className="flex items-center gap-4">
              <Image
                alt="Thumbnail"
                className="aspect-square rounded-md border object-cover"
                height="100"
                src={item.imageUrlList[item.mainImageIndex]}
                width="100"
              />
              <div className="grid gap-1.5">
                <div className="font-medium">{item.storeItemName}</div>
                <div className="text-sm italic">Archivo: {item.fileName}</div>
                <div className="text-xs text-sky-500 dark:text-sky-400">
                  Archivo Digital
                </div>
              </div>
              <div className="ml-auto font-medium">
                {(
                  item.price -
                  (item.price * item.discountPercentage) / 100
                ).toFixed(2)}{" "}
                $MXN
              </div>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <TruckIcon className="h-4 w-4" />
            <span className="text-sm">Descarga Inmediata</span>
          </div>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resumen De La Compra</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2">
          <div className="flex items-center justify-between font-medium">
            <div>Total</div>
            <div>{totalPrice} $MXN</div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <div className="grid gap-2 p-2">
            <h2 className="text-lg font-semibold text-sky-300">
              ❤ Gracias Por Tu Compra! ❤
            </h2>
            <p className="text-sm leading-loose">
              Ya Puedes Descargar Tus Archivos Desde Tu Perfil!
            </p>
            <Link href="/home">
              <Button>Ir A Mis Descargas</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
