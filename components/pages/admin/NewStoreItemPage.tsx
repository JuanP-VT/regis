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
import LoadingButton from "@/components/LoadingButton";
import { Category_ID } from "@/types/category";
import CategorySelectMenu from "@/components/composed/CategorySelectMenu";

type Props = {
  filesKeyList: (string | undefined)[] | undefined;
  categoryList: Category_ID[];
};
/**
 * Page to display a form to add a new store item
 * Route : /admin/new-store-item
 */
export default function NewStoreItemPage({
  filesKeyList,
  categoryList,
}: Props) {
  const [formValue, setFormValue] = useState<NewStoreItem>({
    fileName: "",
    storeItemName: "",
    price: 100,
    discountPercentage: 0,
    images: null,
    details: "", //Will be saved in other React state for type safety
    mainImageIndex: 0,
    categoryIDList: [],
  });
  const [imagesUrl, setImagesUrl] = useState<String[]>([]);
  //We need to show a loading button while the form is being submitted
  const [isLoading, setIsLoading] = useState(false);
  //We need to send the user feedback after the form is submitted
  const [feedback, setFeedback] = useState("");
  const [details, setDetails] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  console.log(selectedCategories);
  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setIsLoading(true);
    //Create form data to sent to the server
    const formData = new FormData();
    formData.append("fileName", formValue.fileName);
    formData.append("storeItemName", formValue.storeItemName);
    formData.append("categoryIDList", JSON.stringify(selectedCategories));
    formData.append("price", formValue.price.toString());
    formData.append(
      "discountPercentage",
      formValue.discountPercentage.toString(),
    );
    formValue.images?.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("mainImageIndex", formValue.mainImageIndex.toString());
    formData.append("details", details);
    //Send the form data to the server
    const response = await fetch("/api/store", {
      method: "POST",
      body: formData,
    });
    if (response.status === 200) {
      setFeedback("Producto Agregado");
      setTimeout(() => {
        location.reload();
      }, 2000);
    }
    if (response.status === 400) {
      setFeedback("Solicitud incorrecta, verifica los campos");
      setIsLoading(false);
    }
    if (response.status === 409) {
      setFeedback("File already exist");
      setIsLoading(false);
    }
    if (response.status === 500) {
      setFeedback("Hubo un error en el servidor");
      setIsLoading(false);
    }
  }
  return (
    <div className="mt-5 flex w-full flex-col items-center p-3 py-5">
      <h1 className="mb-10 text-2xl">
        Formulario De Registro Para Nuevo Producto En Tienda
      </h1>
      <div className="w-full max-w-[900px] ">
        <form onSubmit={(ev) => handleSubmit(ev)}>
          <Label>Archivo a vender</Label>
          <Select
            onValueChange={(value) =>
              setFormValue({ ...formValue, fileName: value })
            }
          >
            <SelectTrigger className="">
              <SelectValue
                placeholder={`${
                  filesKeyList?.length === 0
                    ? "No hay Archivos Disponibles"
                    : "Selecciona Un Archivo"
                }`}
              />
            </SelectTrigger>
            <SelectContent>
              {filesKeyList?.map((fileKey, index) => (
                <SelectItem key={`fileOption${index}`} value={fileKey ?? ""}>
                  {fileKey}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <CategorySelectMenu
            categoryList={categoryList}
            selectedCategories={selectedCategories}
            setCategoryIDList={setSelectedCategories}
          />
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
            step="0.1"
            value={formValue.price.toString()}
            onChange={(ev) =>
              setFormValue((prevState) => ({
                ...prevState,
                price: ev.target.value === "" ? 0 : parseFloat(ev.target.value),
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
                URL.createObjectURL(file),
              );
              setImagesUrl(urls);
            }}
          >
            {({ getRootProps, getInputProps }) => (
              <section className="my-2 w-full cursor-pointer  rounded-lg border bg-slate-100 p-2">
                <div
                  {...getRootProps()}
                  className={`${imagesUrl.length === 0 ? "h-20" : ""}`}
                >
                  <input {...getInputProps()} />
                  <p>Imágenes a subir...</p>
                </div>
                <div className="text-xs ">
                  <ol className="grid  md:grid-cols-3 lg:grid-cols-4">
                    {imagesUrl.map((url, index) => (
                      <div className="relative" key={`rel${index}`}>
                        <p className="absolute bottom-0 rounded-full bg-white p-2 text-xs">
                          {index}
                        </p>
                        <Image
                          className="h-auto w-auto"
                          alt="Imagen de archivo a vender"
                          src={url.toString()}
                          width={100}
                          height={100}
                        />
                      </div>
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
          <Label className="my-3">Detalles del producto</Label>
          <Tiptap onChange={setDetails} />
          <LoadingButton isLoading={isLoading} message="Agregar" />
          <p className="text-sm"> {feedback}</p>
        </form>
      </div>
    </div>
  );
}
