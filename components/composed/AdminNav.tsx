"use client";
import Link from "next/link";
export default function AdminNav() {
  return (
    <div className="w-full p-3 border rounded-lg flex gap-4 text-sm font-semibold  ">
      <Link href="/admin/files">Mis Archivos</Link>
      <Link href="/admin/new-file">Agregar Archivo</Link>
      <Link href="/admin">Registros En La Tienda</Link>
      <Link href="/admin/new-store-item">Agregar Registro A Tienda</Link>
    </div>
  );
}
