"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { ShoppingCart as ShoppingCartLucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import ShoppingCart from "@/utils/classes/ShoppingCart";

type Props = {};

export default function ShoppingCartIcon({}: Props) {
  const [numberOfItems, setNumberOfItems] = useState(0);
  useEffect(() => {
    const cart = new ShoppingCart();
    setNumberOfItems(cart.getItemCount());
    const handleStorageEvent = () => {
      setNumberOfItems(cart.getItemCount());
    };
    window.addEventListener("storage", handleStorageEvent);
    return () => {
      window.removeEventListener("storage", handleStorageEvent);
    };
  }, []);
  return (
    <Link href="/cart">
      <Button size="icon" variant="outline" className="relative">
        {numberOfItems > 0 && (
          <span
            className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 
              text-center text-[11px] text-white"
          >
            {numberOfItems}
          </span>
        )}
        <ShoppingCartLucideIcon className="h-4 w-4" />
        <span className="sr-only">Carrito</span>
      </Button>
    </Link>
  );
}
