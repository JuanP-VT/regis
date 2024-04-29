"use client";
import { StoreItemDB_ID } from "@/types/storeItemDB";
import FreebieCard from "../composed/cards/FreebieCard";
import { Session } from "next-auth";

type Props = { freebies: StoreItemDB_ID[]; session: Session | null };

//This component will display all the freebies available in the store
export default function FreebiesPage({ freebies, session }: Props) {
  return (
    <div className="mt-5 flex w-full flex-col">
      <p className="self-center py-4 text-3xl">Freebies</p>
      <div className="flex max-w-[1100px] flex-col gap-5 self-center sm:grid sm:grid-cols-2">
        {freebies.map((item) => (
          <FreebieCard key={item._id} storeItem={item} session={session} />
        ))}
      </div>
    </div>
  );
}
