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
    <div>
      <div className="flex w-full grid-cols-1 flex-col items-center justify-center gap-2 p-5 sm:grid sm:grid-cols-3 md:grid-cols-4   lg:grid-cols-5 xl:grid-cols-6">
        {storeItems.map((item, index) => (
          <CatalogItemCard key={index} storeItem={item} />
        ))}
      </div>
    </div>
  );
}
