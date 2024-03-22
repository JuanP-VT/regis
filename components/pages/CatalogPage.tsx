"use client";

import { StoreItemDB_ID } from "@/types/storeItemDB";
import CatalogItemCard from "../composed/cards/CatalogItemCard";

type Props = {
  storeItems: StoreItemDB_ID[];
  category: string;
  subCategory: string;
  pagination: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
    hasNextPage: boolean;
  };
};

export default function CatalogPage({
  storeItems,
  category,
  subCategory,
}: Props) {
  return (
    <div className="flex flex-col justify-center ">
      <div className="flex justify-center border-b-2 border-b-slate-100 pb-7 text-3xl capitalize">
        {!subCategory && category && <h1>Categoría - {category}</h1>}
        {subCategory && !category && <h1>Categoría - {subCategory}</h1>}
        {!category && !subCategory && <h1>Catálogo Completo</h1>}
      </div>
      <div className="flex justify-center">
        <div className="flex w-full max-w-[1100px] grid-cols-1 flex-col items-center justify-center gap-2 p-5 md:grid md:grid-cols-2 lg:grid-cols-3 ">
          {storeItems?.map((item, index) => (
            <CatalogItemCard key={index} storeItem={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
