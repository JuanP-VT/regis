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
import { NewStoreItem } from "@/types/newStoreItem";
import { Button } from "@/components/ui/button";

type Props = { filesKeyList: (string | undefined)[] | undefined };

export default function NewStoreItemPage({ filesKeyList }: Props) {
  const [formValue, setFormValue] = useState<NewStoreItem>({
    fileName: "",
    storeItemName: "",
    price: 100,
    discountPercentage: 0,
    images: null,
    details: "",
    mainImageIndex: 0,
  });
  const [imagesUrl, setImagesUrl] = useState<String[]>([]);
  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    //Create form data to sent to the server
    const formData = new FormData();
    formData.append("fileName", formValue.fileName);
    formData.append("storeItemName", formValue.storeItemName);
    formData.append("price", formValue.price.toString());
    formData.append(
      "discountPercentage",
      formValue.discountPercentage.toString()
    );
    formValue.images?.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("mainImageIndex", formValue.mainImageIndex.toString());
    formData.append("details", formValue.details);
    //Send the form data to the server
    const response = await fetch("/api/store", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log(data);
  }
  return (
    <div className="flex flex-col py-5 p-3 w-full mt-5 items-center">
      <div className="w-[900px] ">
        <form onSubmit={(ev) => handleSubmit(ev)}>
          <Label>Archivo a vender</Label>
          <Select
            onValueChange={(value) =>
              setFormValue({ ...formValue, fileName: value })
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar archivo" />
            </SelectTrigger>
            <SelectContent>
              {filesKeyList?.map((fileKey, index) => (
                <SelectItem key={`fileOption${index}`} value={fileKey ?? ""}>
                  {fileKey}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Label className="mt-4">Nombre del archivo en tienda</Label>
          <Input
            onChange={(ev) =>
              setFormValue((prevState) => ({
                ...prevState,
                storeItemName: ev.target.value ?? "",
              }))
            }
            placeholder="Así aparecerá el producto en la tienda"
          />
          <Label className="mt-4">Precio del producto</Label>
          <Input
            type="number"
            value={formValue.price.toString()}
            onChange={(ev) =>
              setFormValue((prevState) => ({
                ...prevState,
                price: ev.target.value === "" ? 0 : parseInt(ev.target.value),
              }))
            }
            placeholder="$MX"
          />
          <Label className="mt-4">Descuento en %</Label>
          <Input
            type="number"
            value={formValue.discountPercentage.toString()}
            onChange={(ev) =>
              setFormValue((prevState) => ({
                ...prevState,
                discountPercentage:
                  ev.target.value === "" ? 0 : parseInt(ev.target.value),
              }))
            }
            placeholder="OPCIONAL, 0 POR DEFECTO"
          />
          <Dropzone
            onDrop={(acceptedFiles) => {
              setFormValue((prevState) => ({
                ...prevState,
                images: acceptedFiles,
              }));
              const urls = acceptedFiles.map((file) =>
                URL.createObjectURL(file)
              );
              setImagesUrl(urls);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <section className="border cursor-pointer  rounded-lg mt-4">
                <div {...getRootProps()}>
                  <input className="" {...getInputProps()} />
                  <p>
                    Deposita las imágenes aquí o da click para abrir el panel
                  </p>
                </div>
                <div className="text-xs mt-4 underline-offset-1 ">
                  <ol className="grid  md:grid-cols-3 lg:grid-cols-4">
                    {imagesUrl.map((url, index) => (
                      <Image
                        className="w-auto h-auto"
                        alt="Imagen de archivo a vender"
                        src={url.toString()}
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
          <Label className="mt-4">Indice De La Imagen Principal</Label>
          <Input
            type="number"
            onChange={(ev) =>
              setFormValue((prevState) => ({
                ...prevState,
                mainImageIndex:
                  ev.target.value === "" ? 0 : parseInt(ev.target.value),
              }))
            }
            placeholder="La primera imagen tiene indice 0"
          />
          <Label className="mt-5">Detalles del producto</Label>
          <Tiptap onChange={setFormValue} />
          <Button className="mt-2">Agregar</Button>
        </form>
      </div>
    </div>
  );
}
