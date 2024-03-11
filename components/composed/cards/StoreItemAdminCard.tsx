import { StoreItemDB_ID } from "@/types/storeItemDB";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";

import { FileEditIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import LoadingButton from "@/components/LoadingButton";
import { useState } from "react";
import Link from "next/link";
import { Category_ID } from "@/types/category";
type Props = { item: StoreItemDB_ID; categoryList: Category_ID[] | undefined };

/**
 * Card to display a store item in the admin panel
 */
export default function StoreItemAdminCard({ item, categoryList }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  async function handleDelete(
    _id: string,
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    ev.preventDefault();
    setIsLoading(true);
    //Delete item from database
    const res = await fetch(`/api/store/delete`, {
      method: "POST",
      body: JSON.stringify(item._id),
    });
    if (res.ok) {
      setFeedback("Registro Borrado");
      setTimeout(() => {
        location.reload();
      }, 2000);
    }
    if (!res.ok) {
      setFeedback("Error al borrar registro");
      setIsLoading(false);
    }
  }
  const categoryNames = item.categoryIDList.map((itemCategory) => {
    const name = categoryList?.find(
      (category) => itemCategory === category._id,
    );
    return name?.name;
  });
  const categoryNamesString = categoryNames.join(", ");

  return (
    <TableRow>
      <TableCell>
        <Image
          alt="File image"
          className=" aspect-square h-auto w-auto rounded-md object-cover "
          height="100"
          src={item.imageUrlList[item.mainImageIndex]}
          width="100"
        />
      </TableCell>
      <TableCell className="font-medium">{item.storeItemName}</TableCell>
      <TableCell className="hidden md:table-cell">{item.fileName}</TableCell>
      <TableCell className="hidden md:table-cell">
        {categoryNamesString}
      </TableCell>
      <TableCell className="hidden md:table-cell">{item.price}$</TableCell>
      <TableCell>{item.discountPercentage}%</TableCell>
      <TableCell className="hidden md:table-cell">
        {(item.price - (item.price * item.discountPercentage) / 100).toFixed(2)}
        $
      </TableCell>
      <TableCell className="">
        <Button variant={"ghost"} className="group" asChild>
          <Link href={`/admin/store-edit/${item._id}`}>
            <FileEditIcon className="h-4 w-4 group-hover:text-pink-500" />
          </Link>
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="group">
              <TrashIcon className="h-4 w-4 group-hover:text-pink-500" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>¿Deseas Borrar Registro En Tienda?</DialogTitle>
              <DialogDescription>
                Los cambios son irreversibles, se borrará el registro en la base
                de datos junto con las imágenes asociadas. <br />
                El Archivo no se borrará del servidor.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4 text-sm">
              <p className="max-h-96 overflow-hidden">
                Nombre en tienda : {item.storeItemName}
              </p>
              <p>Archivo asociado : {item.fileName}</p>
            </div>
            <DialogFooter>
              {isLoading ? (
                <LoadingButton isLoading={true} message="" />
              ) : (
                <Button onClick={(ev) => handleDelete(item._id, ev)}>
                  Borrar
                </Button>
              )}
              <p className="py-2 text-sm text-slate-600">{feedback}</p>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
}
