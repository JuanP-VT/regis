"use client";
import ImageSlider from "../composed/ImageSlider";
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import StarIcon from "../ui/custom svg/StarIcon";
import { StoreItemDB_ID } from "@/types/storeItemDB";

// Option 1: Browser + server-side
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import ShoppingCart from "@/utils/classes/ShoppingCart";
import { toast } from "sonner";
import TiptapReadOnly from "../composed/Text Editor/TipTapReadOnly";
import { Session } from "next-auth";

/**
 *
 *  Main component for individual cut file product page
 *  Displayed in a dynamic route at /store/[id]
 */
type Props = {
  storeItem: StoreItemDB_ID;
  session: Session | null;
};
export default function IndividualCutFileProduct({
  storeItem,
  session,
}: Props) {
  const router = useRouter();
  const userHasProduct =
    session?.user?.purchasedItems.includes(storeItem.fileName) ||
    session?.user.freebies.includes(storeItem.fileName);
  async function handleRequest() {
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
    setTimeout(() => {
      location.reload();
    }, 1000);
  }
  return (
    <div>
      <div className="relative mt-5  flex flex-col-reverse gap-5 md:justify-center lg:flex-row">
        <ArrowLeft
          className="absolute left-10 top-2 z-20 cursor-pointer hover:text-rose-500"
          onClick={(event) => {
            event.preventDefault();
            router.back();
          }}
        />
        <div className="flex w-full max-w-3xl flex-col">
          <ImageSlider images={storeItem.imageUrlList} />
        </div>
        <div className="mr-3 flex flex-col p-1 lg:ml-0 lg:mt-5">
          <PriceTag
            price={storeItem.price}
            discountPercentage={storeItem.discountPercentage}
          />
          <div className="flex justify-end py-2 ">
            {Array(5)
              .fill(0)
              .map((_, index) => (
                <StarIcon className="h-5 w-5 text-rose-300" key={index} />
              ))}
          </div>
          <p className="text-end md:max-w-2xl">{storeItem.storeItemName}</p>
          {/**  If the item is free or has a 100% discount, display a download button */}
          {storeItem.price !== 0 && storeItem.discountPercentage !== 100 ? (
            <Button
              disabled={userHasProduct}
              className="mt-2 max-w-96 rounded-full bg-sky-300 hover:bg-sky-500"
              variant="outline"
              onClick={() => {
                const cart = new ShoppingCart();
                cart.addToCart(storeItem);
                toast("Agregado Al Carrito", {
                  description: `${storeItem.storeItemName.slice(0, 50)}... ha sido agregado al carrito!`,
                  action: {
                    label: "Cerrar",
                    onClick: () => {},
                  },
                });
              }}
            >
              {userHasProduct ? "Producto Comprado" : "Agregar Al Carrito"}
            </Button>
          ) : (
            <Button
              disabled={userHasProduct}
              className="mt-2 max-w-96 rounded-full bg-sky-300 hover:bg-sky-500"
              variant="outline"
              onClick={() => handleRequest()}
            >
              {userHasProduct ? "Freebie Reclamado" : "Reclamar Freebie"}
            </Button>
          )}

          <div className="mt-3 flex flex-col">
            <Accordion type="single" collapsible className="mt-2 md:w-96">
              <AccordionItem value="item-1">
                <AccordionTrigger className="rounded-full pl-3 text-xs font-semibold hover:bg-slate-300">
                  Detalles del producto
                </AccordionTrigger>
                <AccordionContent>
                  <TiptapReadOnly content={storeItem.details} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type="single" collapsible className="mt-2 md:w-96">
              <AccordionItem value="item-1">
                <AccordionTrigger className="rounded-full pl-3 text-xs font-semibold hover:bg-slate-300">
                  Delivery
                </AccordionTrigger>
                <AccordionContent>
                  Descarga instantánea Tus archivos estarán disponibles para
                  descargar una vez Se confirma el pago. Así es cómo. Los
                  elementos de descarga instantánea no aceptar devoluciones,
                  cambios o cancelaciones.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
      <div className="mt-10 flex h-96 border">Placeholder Review Section</div>
      <div className="flex h-96 border">Placeholder ADS Section</div>
    </div>
  );
}

type PriceTagProps = { price: number; discountPercentage: number };
function PriceTag({ price, discountPercentage }: PriceTagProps) {
  const priceAfterDiscount = price - (price * discountPercentage) / 100;
  if (discountPercentage === 0) {
    return (
      <p className=" text-end text-4xl font-semibold text-green-700">
        MX${price.toFixed(2)}
      </p>
    );
  }
  return (
    <div className="flex flex-col">
      <div className="flex">
        <p className="text-4xl font-semibold text-green-700">
          MX${priceAfterDiscount.toFixed(2)}
        </p>
        <p className="ml-2 flex items-center text-xs font-light text-gray-500 line-through">
          ${price.toFixed(2)}
        </p>
      </div>
      <div className="ml-1 flex text-green-600 ">
        {discountPercentage}% Descuento por tiempo limitado!
      </div>
    </div>
  );
}
