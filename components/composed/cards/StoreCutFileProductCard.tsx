"use client";

// Importing required modules and types
import { CutFileProduct } from "@/types/cutFileProduct";
import { CloudDownload, Star } from "@mui/icons-material";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Defining the type for the props of the StoreCutFileProduct component
type Props = {
  cutFileProduct: CutFileProduct;
};

// The StoreCutFileProduct component displays a product in a store
export default function StoreCutFileProductCard({ cutFileProduct }: Props) {
  return (
    <div className="ml-2 flex max-w-[320px]  flex-col border-b-2 border-slate-200 p-2">
      {/* Displaying the product image */}
      <Image
        className="h-80 w-80 rounded-lg object-cover shadow-lg"
        src="https://picsum.photos/600/1200"
        alt={cutFileProduct.name}
        width={500}
        height={500}
      />

      {/* Displaying the product price with any applicable discount */}
      <Price
        price={cutFileProduct.price}
        discountPercentage={cutFileProduct.discountPercentage}
      />

      {/* Displaying the product name */}
      <p className="py-1 text-sm  ">
        {cutFileProduct.name.substring(0, 50)}...
      </p>

      {/* Displaying the product rating and download type */}
      <div className="flex items-center ">
        <div className="ml-2 flex items-center">
          <Star className="h-4 w-4 text-yellow-400" />
          <span className="text-xs ">4.8 Overall rating</span>
        </div>
        <div className="ml-2 flex items-center">
          <CloudDownload className="h-4 w-4 text-blue-500" />
          <span className="text-xs  text-blue-500">Digital Download</span>
        </div>
      </div>

      {/* Displaying the Add To Cart button */}
      <Button
        className="mt-1 w-32 rounded-xl  text-sm"
        size="sm"
        variant="outline"
      >
        Add To Cart
      </Button>
    </div>
  );
}

// Defining the type for the props of the Price component
type PriceProps = {
  price: number;
  discountPercentage: number;
};

// The Price component displays the price of a product with any applicable discount
export function Price({ price, discountPercentage }: PriceProps) {
  if (discountPercentage > 0) {
    const realPrice = price - price * (discountPercentage / 100);
    return (
      <div className="flex pt-1 ">
        {/* Displaying the discounted price */}
        <div className="font-bold text-green-600">
          {realPrice === 0 && <p>Free</p>}
          {realPrice > 0 && <p> USD${realPrice.toFixed(2)}</p>}
        </div>
        {/* Displaying the original price and discount percentage */}
        <div className="mt-1  flex">
          <span className="ml-2 text-xs text-gray-500 line-through">
            USD${price.toFixed(2)}
          </span>
          <span className="ml-1 text-xs font-bold text-red-500 ">
            {discountPercentage}%off
          </span>
        </div>
      </div>
    );
  }
  // Displaying the original price when there is no discount
  return <p className="font-bold text-green-600">USD$:{price.toFixed(2)}</p>;
}
