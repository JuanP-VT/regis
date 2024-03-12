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
        <div className="px-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">Nombre</TableHead>
                <TableHead className="">Descripción</TableHead>
                <TableHead className="w-[500px]">Sub Categorías</TableHead>
                <TableHead className="w-[100px]">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categoryList.map((category, index) => (
                <CategoryCard category={category} key={`item${index}`} />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
