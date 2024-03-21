"use client";

import { StoreItemDB_ID } from "@/types/storeItemDB";
import CatalogItemCard from "../composed/cards/CatalogItemCard";

type Props = {
  storeItems: StoreItemDB_ID[];
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
    hasNextPage: boolean;
  };
};

export default function CatalogPage({ storeItems, pagination }: Props) {
  return (
    <div className="flex justify-center">
      <div className="flex w-full max-w-[1100px] grid-cols-1 flex-col items-center justify-center gap-2 p-5 md:grid md:grid-cols-2 lg:grid-cols-3 ">
        {storeItems.map((item, index) => (
          <CatalogItemCard key={index} storeItem={item} />
        ))}
      </div>
    </div>
  );
}
