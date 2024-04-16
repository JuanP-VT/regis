import { Facebook, Instagram } from "@mui/icons-material";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex min-h-20 items-center justify-center border-t bg-slate-100 py-5 ">
      <div className="flex flex-col gap-3 text-xs text-gray-500 dark:text-gray-400 sm:flex-row">
        <p className="text-start sm:text-center">©2024 Regina & Gael Studio</p>
        <Link href={"/tos"}>
          <p className="text-start sm:text-center">Términos De Servicio</p>
        </Link>
        <Link href={"/privacy"}>
          <p className="text-start sm:text-center">Política de Privacidad </p>
        </Link>
        <Link href={"/contact"}>
          <p className="text-start sm:text-center">Contacto </p>
        </Link>

        <div>
          <Link href="https://www.facebook.com/ReginayGaelStudio">
            <Facebook className="cursor-pointer hover:text-blue-500" />
          </Link>
          <Link href="https://www.instagram.com/disenosregy">
            <Instagram className="cursor-pointer hover:text-rose-500" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
