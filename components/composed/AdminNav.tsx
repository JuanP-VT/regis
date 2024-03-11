"use client";
import Link from "next/link";

/**
 * Navigation bar used in the admin panel
 */
export default function AdminNav() {
  return (
    <div className="flex w-full gap-4 rounded-lg border p-3 text-sm font-semibold  ">
      <Link
        className="cursor-pointer hover:scale-105 hover:text-pink-500"
        href="/admin/files"
      >
        Mis Archivos
      </Link>
      <Link
        className="cursor-pointer hover:scale-105 hover:text-pink-500"
        href="/admin/new-file"
      >
        Agregar Archivo
      </Link>
      <Link
        className="cursor-pointer hover:scale-105 hover:text-pink-500"
        href="/admin"
      >
        Registros En La Tienda
      </Link>
      <Link
        className="cursor-pointer hover:scale-105 hover:text-pink-500"
        href="/admin/new-store-item"
      >
        Agregar Registro A Tienda
      </Link>
      <Link
        className="cursor-pointer hover:scale-105 hover:text-pink-500"
        href="/admin/categories"
      >
        Categorías
      </Link>
    </div>
  );
}
