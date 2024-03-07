"use client";
import Link from "next/link";

/**
 * Navigation bar used in the admin panel
 */
export default function AdminNav() {
  return (
    <div className="flex w-full gap-4 rounded-lg border p-3 text-sm font-semibold  ">
      <Link href="/admin/files">Mis Archivos</Link>
      <Link href="/admin/new-file">Agregar Archivo</Link>
      <Link href="/admin">Registros En La Tienda</Link>
      <Link href="/admin/new-store-item">Agregar Registro A Tienda</Link>
    </div>
  );
}
