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
import ProductReview from "../composed/cards/ProductReview";
import StarIcon from "../ui/custom svg/StarIcon";
export default function IndividualCutFileProduct() {
  return (
    <div className="flex min-h-screen flex-col-reverse gap-5 md:justify-center lg:flex-row">
      <div className="flex max-w-3xl flex-col">
        <ImageSlider
          images={[
            "https://picsum.photos/600/600",
            "https://picsum.photos/500/500",
            "https://picsum.photos/800/800",
            "https://picsum.photos/900/900",
          ]}
        />
        <div className="p-2">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <ProductReview key={`pr${index}`} />
            ))}
        </div>
      </div>
      <div className="ml-3 flex flex-col p-1 lg:ml-0 lg:mt-5">
        <PriceTag price={99.99} discountPercentage={1} />
        <div className="flex py-2 ">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <StarIcon className="h-5 w-5 text-rose-400" key={index} />
            ))}
        </div>
        <p className="md:max-w-2xl ">
          Сamping SVG Bundle. Laser cut file for Glowforge, Mountains Tent
          Glasses Boot Jar Forest Nature Ornament Svg Dxf Ai Pdf Cdr INSTANT
          DOWNLOAD
        </p>
        <Button className="mt-2 max-w-96 rounded-full bg-rose-500">
          Add To Cart
        </Button>
        <div className="mt-3 flex flex-col">
          <Accordion type="single" collapsible className="mt-2 md:w-96">
            <AccordionItem value="item-1">
              <AccordionTrigger className="rounded-full pl-3 text-xs font-semibold hover:bg-slate-300">
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
          <Accordion type="single" collapsible className="mt-2 md:w-96">
            <AccordionItem value="item-1">
              <AccordionTrigger className="rounded-full pl-3 text-xs font-semibold hover:bg-slate-300">
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
      <p className="text-4xl font-semibold text-green-700">
        USD${price.toFixed(2)}
      </p>
    );
  }
  return (
    <div className="flex flex-col">
      <div className="flex">
        <p className="text-4xl font-semibold text-green-700">
          USD${priceAfterDiscount.toFixed(2)}
        </p>
        <p className="ml-2 flex items-center text-xs font-light text-gray-500 line-through">
          ${price.toFixed(2)}
        </p>
      </div>
      <div className="ml-1 flex text-green-600 ">
        {discountPercentage}% off sale for limited time!
      </div>
    </div>
  );
}
