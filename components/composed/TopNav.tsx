"use client";
import Link from "next/link";
import SignInButton from "./SignInButton";
import { Session } from "next-auth";
import ShoppingCartIcon from "./ShoppingCartIcon";
import { DatabaseIcon } from "lucide-react";
import Image from "next/image";

/* 
  Navigation bar used in the store
*/
type Props = {
  session: Session | null;
};
export default function TopNav({ session }: Props) {
  return (
    <header className="flex h-12 items-center border-b bg-melon px-1 md:px-6 lg:h-14 ">
      <div className="flex gap-2 px-1 text-sm font-light text-pink-50 md:gap-8">
        <Link
          className="  text-xs  font-semibold  hover:text-sky-200 sm:text-sm"
          href="/"
        >
          Inicio
        </Link>
        <Link
          className=" text-xs  font-semibold  hover:text-sky-200 sm:text-sm"
          href="/catalog/category=&subCategory=&page=1"
        >
          Catálogo
        </Link>
        <Link
          className="hidden  text-xs font-semibold   hover:text-sky-200 sm:inline sm:text-sm"
          href="/freebies"
        >
          Freebies
        </Link>
        <Link
          className="hidden  text-xs font-semibold hover:text-sky-200 sm:inline sm:text-sm"
          href="/sales"
        >
          Rebajas
        </Link>
      </div>

      <div className="ml-auto flex items-center gap-2  lg:gap-8">
        {session && session.user.role === "admin" && (
          <Link href="/admin">
            <Image
              src="/icon/heart-01.svg"
              className="mt-1 h-4 w-4 scale-150 text-rose-400"
              alt="Admin"
              width={30}
              height={30}
            />
            <span className="sr-only">Admin</span>
          </Link>
        )}
        <ShoppingCartIcon />
        <Link href="/me" className="relative flex h-8 w-8">
          <Image
            alt="Perfil"
            width={30}
            height={30}
            src="icon/user.svg"
            className="pointer-events-none h-full w-full  object-contain"
          />
          <span className="sr-only">Perfil</span>
        </Link>
        <SignInButton session={session} />
      </div>
    </header>
  );
}
