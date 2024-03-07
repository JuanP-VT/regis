"use client";
import { _Object } from "@aws-sdk/client-s3";
import FileAdminCard from "../../composed/cards/FileAdminCard";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "@/components/ui/table";
type Props = {
  files: _Object[] | undefined;
};

/**
 * Page to display all files in the admin panel
 *  Route : /admin/files
 */
export default function FilesPage({ files }: Props) {
  if (!files) {
    return <div>Error al obtener archivos</div>;
  }

  return (
    <div className="">
      <div className="">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Nombre</TableHead>
              <TableHead className="overflow-hidden ">Tipo</TableHead>
              <TableHead className="hidden md:table-cell">
                Ultima Modificación
              </TableHead>
              <TableHead className="w-[100px]">Tamaño</TableHead>
              <TableHead className="w-[100px]">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {files.map((file, index) => (
              <FileAdminCard file={file} key={`tem${index}`} />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
