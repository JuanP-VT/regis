import React from "react";
import { Button } from "./ui/button";
import ShoppingCart from "@/utils/classes/ShoppingCart";
import { StoreItemDB_ID } from "@/types/storeItemDB";
import { useState } from "react";
import { ShoppingCartCheckout } from "@mui/icons-material";
type Props = {
  storeItem: StoreItemDB_ID;
};

export default function AddToShoppingCartButton({ storeItem }: Props) {
  const [animationIsPlaying, setAnimationIsPlaying] = useState(false);
  return (
    <Button
      size={"sm"}
      className="absolute bottom-0 flex w-full -translate-x-96 overflow-hidden rounded-xl
       bg-pink-300 text-xs transition-all duration-300 hover:bg-pink-400 group-hover:-translate-x-0"
      onClick={() => {
        setAnimationIsPlaying(true);
        const cart = new ShoppingCart();
        cart.addToCart(storeItem);
        setTimeout(() => {
          setAnimationIsPlaying(false);
        }, 1500);
      }}
    >
      <div className="flex">
        <p className={`px-2 font-bold ${animationIsPlaying && "font-bold "}`}>
          {animationIsPlaying ? "Agregado Al Carrito!" : "Agregar Al Carrito"}
        </p>
        <ShoppingCartCheckout
          className={`  transition-all duration-700 ${animationIsPlaying ? "-translate-x-0 " : "-translate-x-96"}`}
        />
      </div>
    </Button>
  );
}
