"use client";
import { useState } from "react";
import { _Object } from "@aws-sdk/client-s3";
import { TableRow, TableCell } from "@/components/ui/table";
import formatFileSize from "@/utils/formatFileSize";
import { Button } from "@/components/ui/button";
import { FileEditIcon, TrashIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import LoadingButton from "@/components/LoadingButton";
import { AwsS3Client } from "@/lib/awsS3Client";
type Props = {
  file: _Object;
};

export default function FileAdminCard({ file }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  const formattedDate = new Date(file.LastModified ?? "").toLocaleDateString(
    "es-ES",
    { month: "short", year: "numeric", day: "numeric" },
  );
  const formattedFileSize = formatFileSize(file.Size);

  async function handleDelete(fileName: string | undefined) {
    setIsLoading(true);
    const res = await fetch("/api/files/delete", {
      method: "POST",
      body: JSON.stringify({ fileName }),
    });
    if (res.ok) {
      setFeedback("Archivo Borrado con éxito");
      setTimeout(() => {
        location.reload();
      }, 2000);
      return;
    } else {
      setFeedback("Error al borrar archivo");
      setIsLoading(false);
    }
  }
  return (
    <TableRow>
      <TableCell className="font-medium">{file.Key}</TableCell>
      <TableCell className="hidden md:table-cell">
        {file.Key?.split(".").pop()}
      </TableCell>
      <TableCell className="hidden md:table-cell">{formattedDate}</TableCell>
      <TableCell>{formattedFileSize}</TableCell>
      <TableCell className="">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost">
              <TrashIcon className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>¿Deseas Borrar Archivo?</DialogTitle>
              <DialogDescription>
                Los cambios son irreversibles, se borrará Archivo junto con el
                registro en la base de datos y las imágenes asociadas. <br />
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4 text-sm">
              <p>Archivo: {file.Key}</p>
            </div>
            <DialogFooter>
              {isLoading ? (
                <LoadingButton isLoading={true} message="" />
              ) : (
                <Button onClick={() => handleDelete(file.Key)}>Borrar</Button>
              )}
              <p className="py-2 text-sm text-slate-600">{feedback}</p>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </TableCell>
    </TableRow>
  );
}
