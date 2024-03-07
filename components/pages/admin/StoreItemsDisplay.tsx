"use client";
import LoadingButton from "@/components/LoadingButton";
import { StoreItemDB_ID } from "@/types/storeItemDB";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { useState } from "react";
import filterStoreItemsByKeyWord from "@/utils/filterStoreItemsByKeyWord";
import StoreItemAdminCard from "../../composed/cards/StoreItemAdminCard";
type Props = {
  storeItems: StoreItemDB_ID[] | undefined;
};
/**
 * Page to display all store items in the admin panel
 *  Route : /admin
 */
export default function StoreItemsDisplay({ storeItems }: Props) {
  const [filteredList, setFilteredList] = useState(storeItems ?? []);

  if (storeItems === undefined) {
    return <LoadingButton isLoading={true} message="" />;
  }
  return (
    <main className="flex flex-1 flex-col gap-4 md:gap-8 md:p-6">
      <h1 className="text-2xl font-semibold">Productos En La Tienda</h1>
      <Input
        onChange={(ev) => {
          setFilteredList(
            filterStoreItemsByKeyWord(storeItems, ev.target.value),
          );
        }}
      />
      <div className="rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px] ">Imagen</TableHead>
              <TableHead className="max-w-[500px] overflow-hidden">
                Nombre en tienda
              </TableHead>
              <TableHead className="hidden md:table-cell">Archivo</TableHead>
              <TableHead className="md:table-cell">Precio</TableHead>
              <TableHead className="hidden md:table-cell">Descuento</TableHead>
              <TableHead className="hidden md:table-cell">
                Precio con descuento
              </TableHead>
              <TableHead className="w-[100px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredList.map((item, index) => (
              <StoreItemAdminCard key={index} item={item} />
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
