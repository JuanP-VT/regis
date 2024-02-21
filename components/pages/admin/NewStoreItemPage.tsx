"use client";
import { Input } from "@/components/ui/input";
import Dropzone from "react-dropzone";
import Image from "next/image";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import Tiptap from "@/components/composed/Text Editor/TipTap";

type Props = { filesKeyList: (string | undefined)[] | undefined };

export default function NewStoreItemPage({ filesKeyList }: Props) {
  const [value, setValue] = useState("");
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);
  return (
    <div className="flex flex-col py-5 p-3 w-full mt-5 items-center">
      <div className="w-[900px] ">
        <Label>Archivo a vender</Label>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Seleccionar archivo" />
          </SelectTrigger>
          <SelectContent>
            {filesKeyList?.map((fileKey, index) => (
              <SelectItem key={`fileOption${index}`} value="light">
                {fileKey}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Label className="mt-4">Nombre del archivo en tienda</Label>
        <Input placeholder="Así aparecerá el producto en la tienda" />
        <Label className="mt-4">Precio del producto</Label>
        <Input placeholder="$MX" />
        <Label className="mt-4">Descuento en %</Label>
        <Input placeholder="OPCIONAL, 0 POR DEFECTO" />
        <Dropzone onDrop={(acceptedFiles) => setAcceptedFiles(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section className="border cursor-pointer  rounded-lg mt-4">
              <div {...getRootProps()}>
                <input className="" {...getInputProps()} />
                <p>Deposita las imágenes aquí o da click para abrir el panel</p>
              </div>
              <div className="text-xs mt-4 underline-offset-1 ">
                <ol className="grid  md:grid-cols-3 lg:grid-cols-4">
                  {acceptedFiles.map((file, index) => (
                    <Image
                      className="w-auto h-auto"
                      alt="Imagen de archivo a vender"
                      src={URL.createObjectURL(file)}
                      key={`rel${index}`}
                      width={100}
                      height={100}
                    />
                  ))}
                </ol>
              </div>
            </section>
          )}
        </Dropzone>
        <Label className="mt-5">Detalles del producto</Label>
        <Tiptap />
      </div>
    </div>
  );
}
