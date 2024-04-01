"use client";
import React from "react";
import { DownloadIcon, UserIcon } from "lucide-react";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { PurchaseOrder, PurchaseUnit } from "@/types/PurchaseOrder";
import { User_ID } from "@/types/user";
import { toast } from "sonner";
type Props = {
  user: User_ID;
  purchaseOrders: PurchaseOrder[];
};

export default function ProfilePage({ user, purchaseOrders }: Props) {
  const purchasedUnits = purchaseOrders.flatMap((order) => order.purchaseUnits);
  //Unique list
  let uniquePurchaseUnits = purchasedUnits.reduce(
    (unique: PurchaseUnit[], unit: PurchaseUnit) => {
      if (!unique.some((u) => u.referenceID === unit.referenceID)) {
        unique.push(unit);
      }
      return unique;
    },
    [],
  );
  async function handleDownload(fileName: string) {
    const res = await fetch(`/api/download`, {
      method: "POST",
      body: JSON.stringify({ fileName }),
    });
    if (res.ok) {
      const data = await res.json();
      const { url } = data;
      window.open(url);
    } else {
      toast.error("No tienes acceso a este archivo", {
        description:
          "Intenta de nuevo, Si crees que esto es un error contacta a soporte",
      });
    }
  }
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Perfil</CardTitle>
          <CardDescription>Información Del Usuario</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-2">
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <div className="grid h-12 w-12 items-center justify-center rounded-lg bg-gray-300/40 dark:bg-gray-700/40">
                {user.profileImage ? (
                  <Image
                    className="rounded-lg"
                    src={user.profileImage}
                    width={100}
                    height={100}
                    alt="Profile Picture"
                  />
                ) : (
                  <UserIcon className="h-6 w-6 rounded-lg text-gray-300 dark:text-gray-900" />
                )}
              </div>
              <div className="ml-4 grid gap-0.5">
                <h1 className="text-lg font-semibold capitalize sm:text-2xl">
                  {user.name}
                </h1>
                <p className="text-sm capitalize text-gray-500 dark:text-gray-400">
                  {user.role}
                </p>
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center gap-4">
              <div className="w-20 text-sm">Email</div>
              <div className="p-2 font-medium">
                {user.email || "Sin Email Proporcionado"}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="mx-auto mt-3 w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Mis Archivos</CardTitle>
          <CardDescription>Descarga Tus Archivos Comprados</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="grid gap-4">
            {uniquePurchaseUnits.map((unit, index) => (
              <div
                key={`order` + index}
                className="flex items-center gap-4 p-4"
              >
                <DownloadIcon className="h-8 w-8" />
                <div className="grid gap-0.5">
                  <h3 className="font-semibold"> {unit.referenceID}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Archivo {index + 1}
                  </p>
                </div>
                <Button
                  onClick={() => handleDownload(unit.referenceID)}
                  className="ml-auto"
                  size="sm"
                >
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
