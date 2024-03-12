"use client";
import { Category_ID } from "@/types/category";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "@/components/ui/table";

import CategoryCard from "@/components/composed/cards/CategoryCard";
import { CreateNewCategory } from "./CreateNewCategory";

type Props = {
  categoryList: Category_ID[];
};

export default function CategoriesPage({ categoryList }: Props) {
  return (
    <div className="">
      <div className="">
        <CreateNewCategory />
        <div className="">
          <Table className="">
            <TableHeader className="bg-slate-700 font-bold ">
              <TableRow className="">
                <TableHead className="font-bold text-white">Nombre</TableHead>
                <TableHead className="font-bold text-white">
                  Descripción
                </TableHead>
                <TableHead className="w-[500px] font-bold text-white">
                  Sub Categorías
                </TableHead>
                <TableHead className="w-[100px] font-bold text-white">
                  Acciones
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoryList.map((category, index) => (
                <CategoryCard
                  category={category}
                  key={`item${index}`}
                  index={index}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
