"use client";
import { Star } from "@mui/icons-material";
import ImageSlider from "../composed/ImageSlider";
import { Button } from "../ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
export default function IndividualCutFileProduct() {
  return (
    <div className="flex flex-col md:flex-row gap-5 md:justify-center min-h-screen">
      <div className="">
        <ImageSlider
          images={[
            "https://picsum.photos/600/600",
            "https://picsum.photos/500/500",
            "https://picsum.photos/800/800",
            "https://picsum.photos/900/900",
          ]}
        />
      </div>
      <div className="md:mt-5 md:ml-0 ml-3 flex flex-col">
        <PriceTag price={99.99} discountPercentage={1} />
        <div className="flex py-2 ">
          <Star className="w-4 h-4 text-yellow-300" />
          <Star className="w-4 h-4 text-yellow-300" />
          <Star className="w-4 h-4 text-yellow-300" />
          <Star className="w-4 h-4 text-yellow-300" />
          <Star className="w-4 h-4 text-yellow-300" />
        </div>
        <p className="flex md:max-w-96 ">
          Сamping SVG Bundle. Laser cut file for Glowforge, Mountains Tent
          Glasses Boot Jar Forest Nature Ornament Svg Dxf Ai Pdf Cdr INSTANT
          DOWNLOAD
        </p>
        <Button variant={"outline"} className="rounded-full max-w-96 mt-2">
          Add To Cart
        </Button>
        <div className="flex flex-col mt-3">
          <Accordion type="single" collapsible className="mt-2">
            <AccordionItem value="item-1">
              <AccordionTrigger className="hover:bg-slate-300 text-xs font-semibold rounded-full pl-3">
                Items Details
              </AccordionTrigger>
              <AccordionContent>
                A project for the CNC. Project of plywood. Vector drawing, in
                electronic format. Drawing-vector cutting plan. Suitable for
                laser cutting. All files are archived. Just download the file,
                modify the design layout to suit your requirements, and youre
                done.
                <br />
                After cutting, you can paint in any color or decorate with
                decorative elements. The product can be made of plywood or wood.
                We recommend using 3mm plywood. The project is very economical
                and easy to assemble, great for mass production. Note: in some
                archives there are no Assembly instructions, but you are
                creative people and you will not be difficult to assemble the
                product.
                <br />
                By purchasing electronic materials in this store, you agree to
                all the rules:
                <br />
                1. Electronic products are non-refundable;
                <br /> 2. Customer is the only responsible for resizing and
                editing files after purchase. If you have questions about files,
                feel free to ask before making purchase. The project includes
                vector plan drawing for the CNC machine for cutting out from the
                vector contours. These files are vector and compatible with all
                laser cutting software, cnc router, plotter. You can use several
                materials: wood, plywood, foam, cardboard, plexiglass, etc.
                <br />
                All our products are conceived and planned for easy cutting and
                assembly.
                <br />
                FILE FORMATS - cdr - ai - pdf - dxf - svg DIGITAL FILES Vector
                files scalable to any size.
                <br /> INSTANT DOWNLOAD Once payment is cleared, you can
                download your files directly from your Etsy account. This is a
                digital file available as an instant download, no physical item
                will be sent. The archive has a vector file, if desired, the
                size can be changed.
                <br /> YOU MAY PRINT AND SELL AS MANY PRODUCTS AS YOU LIKE. YOU
                MAY NOT SELL OR DISTRIBUTE THE DIGITAL FILES IN ANY WAY.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible className="mt-2">
            <AccordionItem value="item-1">
              <AccordionTrigger className="hover:bg-slate-300 text-xs font-semibold rounded-full pl-3">
                Delivery
              </AccordionTrigger>
              <AccordionContent>
                Instant Download Your files will be available to download once
                payment is confirmed. Heres how. Instant download items don’t
                accept returns, exchanges or cancellations. Please contact the
                seller about any problems with your order
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
      <p className="text-4xl text-green-700 font-semibold">
        USD${price.toFixed(2)}
      </p>
    );
  }
  return (
    <div className="flex flex-col">
      <div className="flex">
        <p className="text-4xl text-green-700 font-semibold">
          USD${priceAfterDiscount.toFixed(2)}
        </p>
        <p className="text-xs ml-2 text-gray-500 line-through flex items-center font-light">
          ${price.toFixed(2)}
        </p>
      </div>
      <div className="flex text-green-600 ml-1 ">
        {discountPercentage}% off sale for limited time!
      </div>
    </div>
  );
}
