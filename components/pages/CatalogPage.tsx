"use client";

import { StoreItemDB_ID } from "@/types/storeItemDB";
import CatalogItemCard from "../composed/cards/CatalogItemCard";
import Pagination from "../composed/Pagination";

type Props = {
  storeItems: StoreItemDB_ID[];
  category: string;
  subCategory: string;
  categoryID: string;
  subCategoryID: string;
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
  categoryID,
  subCategoryID,
  subCategory,
  pagination,
}: Props) {
  if (storeItems.length === 0) {
    return (
      <div className="p-3 text-center italic underline">
        No Se Encontraron Productos Con Estos Filtros
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center ">
      <div className="flex justify-center border-b-2 border-b-slate-100 pb-7 text-3xl capitalize">
        {!subCategory && category && <h1>Categoría - {category}</h1>}
        {subCategory && <h1>Categoría - {subCategory}</h1>}
        {!category && !subCategory && <h1>Catálogo Completo</h1>}
      </div>
      <div className="flex flex-col items-center">
        <div className="max-w-[1100px]">
          <div className="flex w-full  grid-cols-1 flex-col items-center justify-center gap-2 gap-y-5 p-5 md:grid md:grid-cols-2 lg:grid-cols-3">
            {storeItems?.map((item, index) => (
              <CatalogItemCard key={index} storeItem={item} />
            ))}
          </div>
          <Pagination
            currentPage={pagination.currentPage}
            numberOfPages={pagination.totalPages}
            categoryID={categoryID}
            subCategoryID={subCategoryID}
          />
        </div>
      </div>
    </div>
  );
}
