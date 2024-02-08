"use client";
import {
  ShoppingCart,
  Favorite,
  People,
  FavoriteBorder,
} from "@mui/icons-material";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import SignInButton from "./SignInButton";
export default function TopNav() {
  return (
    <header className="flex items-center h-10 px-4 border-b lg:h-14 md:px-6 bg-gradient-to-l from-sky-100 to-pink-50">
      <nav className="gap-4 md:flex lg:gap-8 text-sm lg:text-lg">
        <Link className="font-semibold  uppercase underline-on-hover" href="#">
          Home
        </Link>
        <Link className="font-semibold  uppercase underline-on-hover" href="#">
          Store
        </Link>
      </nav>

      <div className="flex items-center gap-4 ml-auto lg:gap-8 lg:ml-auto">
        <Button size="sm" variant="outline">
          <ShoppingCart className="w-4 h-4" />
          <span className="sr-only">Toggle cart</span>
        </Button>
        <Button size="sm" variant="outline">
          <FavoriteBorder className="w-4 h-4" />
          <span className="sr-only">Toggle favorite products</span>
        </Button>
        <Button size="sm" variant="outline">
          <People className="w-4 h-4" />
          <span className="sr-only">Toggle account</span>
        </Button>
        <SignInButton />
      </div>
    </header>
  );
}
