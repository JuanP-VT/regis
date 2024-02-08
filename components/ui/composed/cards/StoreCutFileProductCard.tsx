"use client";

// Importing required modules and types
import { CutFileProduct } from "@/types/cutFileProduct";
import { CloudDownload, Star } from "@mui/icons-material";
import Image from "next/image";
import { Button } from "../../button";

// Defining the type for the props of the StoreCutFileProduct component
type Props = {
  cutFileProduct: CutFileProduct;
};

// The StoreCutFileProduct component displays a product in a store
export default function StoreCutFileProductCard({ cutFileProduct }: Props) {
  return (
    <div className="max-w-[320px] border-b-2 border-slate-200  flex flex-col ml-2 p-2">
      {/* Displaying the product image */}
      <Image
        className="rounded-lg shadow-lg h-80 w-80 object-cover"
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
      <p className="text-sm py-1  ">
        {cutFileProduct.name.substring(0, 50)}...
      </p>

      {/* Displaying the product rating and download type */}
      <div className="flex items-center ">
        <div className="flex items-center ml-2">
          <Star className="h-4 w-4 text-yellow-400" />
          <span className="text-xs ">4.8 Overall rating</span>
        </div>
        <div className="flex items-center ml-2">
          <CloudDownload className="text-blue-500 h-4 w-4" />
          <span className="text-xs  text-blue-500">Digital Download</span>
        </div>
      </div>

      {/* Displaying the Add To Cart button */}
      <Button
        className="rounded-xl mt-1 w-32  text-sm"
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
        <div className="flex  mt-1">
          <span className="text-gray-500 text-xs ml-2 line-through">
            USD${price.toFixed(2)}
          </span>
          <span className="text-red-500 font-bold text-xs ml-1 ">
            {discountPercentage}%off
          </span>
        </div>
      </div>
    );
  }
  // Displaying the original price when there is no discount
  return <p className="font-bold text-green-600">USD$:{price.toFixed(2)}</p>;
}
