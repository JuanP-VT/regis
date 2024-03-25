"use client";
import ImageSlider from "../composed/ImageSlider";
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ProductReview from "../composed/cards/ProductReview";
import StarIcon from "../ui/custom svg/StarIcon";
import { StoreItemDB_ID } from "@/types/storeItemDB";

// Option 1: Browser + server-side
import Tiptap from "../composed/Text Editor/TipTap";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

/**
 *
 *  Main component for individual cut file product page
 *  Displayed in a dynamic route at /store/[id]
 */
type Props = {
  storeItem: StoreItemDB_ID;
};
export default function IndividualCutFileProduct({ storeItem }: Props) {
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col-reverse gap-5 md:justify-center lg:flex-row">
      <ArrowLeft
        className="cursor-pointer hover:text-rose-500"
        onClick={(event) => {
          event.preventDefault();
          router.back();
        }}
      />
      <div className="flex max-w-3xl flex-col">
        <ImageSlider images={storeItem.imageUrlList} />
        <div className="p-2">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <ProductReview key={`pr${index}`} />
            ))}
        </div>
      </div>
      <div className="ml-3 flex flex-col p-1 lg:ml-0 lg:mt-5">
        <PriceTag
          price={storeItem.price}
          discountPercentage={storeItem.discountPercentage}
        />
        <div className="flex py-2 ">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <StarIcon className="h-5 w-5 text-rose-400" key={index} />
            ))}
        </div>
        <p className="md:max-w-2xl ">{storeItem.storeItemName}</p>
        <Button className="mt-2 max-w-96 rounded-full bg-rose-500">
          Add To Cart
        </Button>
        <div className="mt-3 flex flex-col">
          <Accordion type="single" collapsible className="mt-2 md:w-96">
            <AccordionItem value="item-1">
              <AccordionTrigger className="rounded-full pl-3 text-xs font-semibold hover:bg-slate-300">
                Detalles del producto
              </AccordionTrigger>
              <AccordionContent>
                <Tiptap readOnly content={storeItem.details} />
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
  );
}

type PriceTagProps = { price: number; discountPercentage: number };
function PriceTag({ price, discountPercentage }: PriceTagProps) {
  const priceAfterDiscount = price - (price * discountPercentage) / 100;
  if (discountPercentage === 0) {
    return (
      <p className="text-4xl font-semibold text-green-700">
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
