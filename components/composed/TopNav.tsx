"use client";
import { People } from "@mui/icons-material";
import { Button } from "@/components/ui/button";

import Link from "next/link";
import SignInButton from "./SignInButton";
import { Session } from "next-auth";
import ShoppingCartIcon from "./ShoppingCartIcon";

/* 
  Navigation bar used in the store
*/
type Props = {
  session: Session | null;
};
export default function TopNav({ session }: Props) {
  return (
    <header className="flex h-12 items-center border-b bg-slate-100 px-1 md:px-6 lg:h-14 ">
      <div className="flex gap-2 px-1 text-sm md:gap-8">
        <Link className="text-xs font-semibold sm:text-base" href="/">
          Inicio
        </Link>
        <Link
          className="text-xs font-semibold sm:text-base"
          href="/catalog/category=&subCategory=&page=1"
        >
          Catálogo
        </Link>
      </div>

      <div className="ml-auto flex items-center gap-1  lg:gap-8">
        <ShoppingCartIcon />
        <Link href="/me">
          <Button size="icon" variant="outline">
            <People className="h-4 w-4" />
            <span className="sr-only">Perfil</span>
          </Button>
        </Link>
        <SignInButton session={session} />
      </div>
    </header>
  );
}
