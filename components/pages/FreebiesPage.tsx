"use client";
import { StoreItemDB_ID } from "@/types/storeItemDB";
import FreebieCard from "../composed/cards/FreebieCard";
import { Session } from "next-auth";
import { Category_ID } from "@/types/category";
import CategoryNav from "../composed/CategoryNav";

type Props = {
  freebies: StoreItemDB_ID[];
  session: Session | null;
  categoryList: Category_ID[];
};

//This component will display all the freebies available in the store
export default function FreebiesPage({
  freebies,
  session,
  categoryList,
}: Props) {
  return (
    <div className=" flex w-full flex-col">
      <CategoryNav categoryList={categoryList} />

      <p className="self-center py-4 text-3xl">Freebies</p>
      <div className="flex max-w-[1100px] flex-col gap-5 self-center sm:grid sm:grid-cols-2">
        {freebies.map((item) => (
          <FreebieCard key={item._id} storeItem={item} session={session} />
        ))}
      </div>
    </div>
  );
}
