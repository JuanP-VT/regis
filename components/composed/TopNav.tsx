"use client";
import { ShoppingCart, People, FavoriteBorder } from "@mui/icons-material";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import SignInButton from "./SignInButton";
import { signOut } from "next-auth/react";

/* 
  Navigation bar used in the store
*/
export default function TopNav() {
  return (
    <header className="flex h-10 items-center border-b bg-slate-100 px-4 md:px-6 lg:h-14 ">
      <nav className="gap-4 text-sm md:flex lg:gap-8 ">
        <Link className="font-semibold  uppercase " href="/">
          Home
        </Link>
        <Link className="font-semibold  uppercase " href="/store">
          Store
        </Link>
      </nav>

      <div className="ml-auto flex items-center gap-4 lg:ml-auto lg:gap-8">
        <Button size="sm" variant="outline">
          <ShoppingCart className="h-4 w-4" />
          <span className="sr-only">Toggle cart</span>
        </Button>
        <Button size="sm" variant="outline">
          <FavoriteBorder className="h-4 w-4" />
          <span className="sr-only">Toggle favorite products</span>
        </Button>
        <Button size="sm" variant="outline">
          <People className="h-4 w-4" />
          <span className="sr-only">Toggle account</span>
        </Button>
        <SignInButton />
        <Button onClick={() => signOut()} />
      </div>
    </header>
  );
}
