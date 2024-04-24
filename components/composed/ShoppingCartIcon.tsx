"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import ShoppingCart from "@/utils/classes/ShoppingCart";
import Image from "next/image";
type Props = {};

export default function ShoppingCartIcon({}: Props) {
  const [numberOfItems, setNumberOfItems] = useState(0);

  // Custom storage event to trigger the update of the number of items in the cart
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
    <Link href="/cart" className="relative h-8 w-8">
      {numberOfItems > 0 && (
        <span
          className="absolute left-6 z-10 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 
              text-center text-[11px] text-white"
        >
          {numberOfItems}
        </span>
      )}
      <Image
        alt="Perfil"
        width={40}
        height={40}
        src="icon/bag.svg"
        className="pointer-events-none h-full w-full object-contain"
      />
      <span className="sr-only">Carrito</span>
    </Link>
  );
}
