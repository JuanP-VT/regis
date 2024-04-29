"use client";
import { StoreItemDB_ID } from "@/types/storeItemDB";
import CatalogItemCard from "../composed/cards/CatalogItemCard";
import CategoryNav from "../composed/CategoryNav";
import { Category_ID } from "@/types/category";

type Props = {
  items: StoreItemDB_ID[];
  categoryList: Category_ID[];
};

export default function SalesPage({ items, categoryList }: Props) {
  return (
    <div className="">
      <CategoryNav categoryList={categoryList} />
      <div className="mt-5 flex w-full flex-col">
        <p className="self-center py-5 text-3xl">Rebajas</p>
        <div className="flex max-w-[1100px] flex-col gap-5 self-center sm:grid sm:grid-cols-2">
          {items.map((item, index) => (
            <CatalogItemCard key={index} storeItem={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
