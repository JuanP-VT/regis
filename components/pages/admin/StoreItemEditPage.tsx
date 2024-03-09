"use client";
import LoadingButton from "@/components/LoadingButton";
import CategorySelectMenu from "@/components/composed/CategorySelectMenu";
import Tiptap from "@/components/composed/Text Editor/TipTap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Category_ID } from "@/types/category";
import { StoreItemDB_ID } from "@/types/storeItemDB";
import Image from "next/image";
import { useState } from "react";
import Dropzone from "react-dropzone";
type Props = {
  storeItem: StoreItemDB_ID;
  categoryList: Category_ID[];
};
/**
 * Page to edit store items in the admin panel
 * Dynamic route : /admin/store-edit/[id]
 */
export default function StoreItemEditPage({ storeItem, categoryList }: Props) {
  const [feedback, setFeedback] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formState, setFormState] = useState<StoreItemDB_ID>(storeItem);
  const [details, setDetails] = useState<string>(storeItem.details);
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [newImageUrl, setNewImageUrl] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    storeItem.categoryIDList,
  );
  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    ev.preventDefault();
    const formData = new FormData();
    //Append all the form data
    formData.append("storeItemID", formState._id);
    formData.append("fileName", formState.fileName);
    formData.append("categoryIDList", JSON.stringify(selectedCategories));
    formData.append("storeItemName", formState.storeItemName);
    formData.append("price", formState.price.toString());
    formData.append(
      "discountPercentage",
      formState.discountPercentage.toString(),
    );
    formData.append("details", details);
    formData.append("mainImageIndex", formState.mainImageIndex.toString());
    //Append old images
    formState.imageNamesList.forEach((imageName) => {
      formData.append("imageNamesList", imageName);
    });
    formState.imageUrlList.forEach((imageUrl) => {
      formData.append("imageUrlList", imageUrl);
    });
    //Append all the new images
    newImageFiles.forEach((file) => {
      formData.append("newImages", file);
    });
    console.log(formData.get("imageNamesList"));
    //Send the form data to the server
    const req = await fetch("/api/store/edit", {
      method: "POST",
      body: formData,
    });
    const res = await req.json();
    if (req.ok) {
      setFeedback("Cambios guardados");
      setTimeout(() => {
        location.reload();
      }, 2000);
    } else {
      setFeedback(res.message);
      setIsLoading(false);
    }
  }
  return (
    <div className="p-5">
      <div>
        <form onSubmit={(ev) => handleSubmit(ev)}>
          <div className="flex flex-col">
            <Label className="mt-2">Archivo</Label>
            <Input value={formState.fileName || ""} disabled />
          </div>
          <div className="flex flex-col">
            <CategorySelectMenu
              categoryList={categoryList}
              selectedCategories={selectedCategories}
              setCategoryIDList={setSelectedCategories}
            />
          </div>
          <div className="flex flex-col">
            <Label className="mt-2">Nombre En Tienda</Label>
            <Input
              value={formState.storeItemName}
              onChange={(ev) =>
                setFormState((prev) => ({
                  ...prev,
                  storeItemName: ev.target.value,
                }))
              }
            />
          </div>
          <div className="flex flex-col">
            <Label className="mt-2">Precio</Label>
            <Input
              type="number"
              value={formState.price}
              onChange={(ev) =>
                setFormState((prev) => ({
                  ...prev,
                  price: ev.target.value === "" ? 0 : parseInt(ev.target.value),
                }))
              }
            />
          </div>
          <div className="flex flex-col">
            <Label className="mt-2">Descuento %</Label>
            <Input
              type="number"
              value={formState.discountPercentage}
              onChange={(ev) =>
                setFormState((prev) => ({
                  ...prev,
                  discountPercentage:
                    ev.target.value === "" ? 0 : parseInt(ev.target.value),
                }))
              }
            />
          </div>
          <div>
            <Label className="mt-2">Detalles</Label>
            <Tiptap onChange={setDetails} content={formState.details} />
          </div>
          <div className="flex flex-col">
            <Label className="my-3 text-xl">Imágenes Guardadas</Label>
            <div className="mb-5 flex gap-2 border">
              {formState.imageNamesList.map((imageName, index) => (
                <div className="relative " key={imageName}>
                  <p className="absolute bottom-0 rounded-full bg-white px-2 py-1 text-xs font-semibold">
                    {index}
                  </p>
                  <Button
                    className="absolute top-0 h-5 w-5 rounded-full bg-white px-2 py-1 font-semibold text-red-500"
                    onClick={(ev) => {
                      ev.preventDefault();
                      //Delete image index from react state
                      let newImageList = [...formState.imageNamesList];
                      let newImageUrlList = [...formState.imageUrlList];
                      newImageList.splice(index, 1);
                      newImageUrlList.splice(index, 1);
                      setFormState((prev) => ({
                        ...prev,
                        imageNamesList: newImageList,
                        imageUrlList: newImageUrlList,
                      }));
                    }}
                  >
                    X
                  </Button>
                  <Image
                    className="h-auto w-auto"
                    src={formState.imageUrlList[index]}
                    alt={formState.storeItemName}
                    width={300}
                    height={300}
                  />
                </div>
              ))}
            </div>
            <div>
              <Label className="text-xl">Agregar Imágenes</Label>
              <Dropzone
                onDrop={(acceptedFiles) => {
                  setNewImageFiles(acceptedFiles);
                  const urls = acceptedFiles.map((file) =>
                    URL.createObjectURL(file),
                  );
                  setNewImageUrl(urls);
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <section className="my-5 cursor-pointer  rounded-lg border ">
                    <div {...getRootProps()}>
                      <input className="" {...getInputProps()} />
                      <p>
                        Deposita las imágenes aquí o da click para abrir el
                        panel
                      </p>
                    </div>
                    <div className="mt-4 text-xs underline-offset-1 ">
                      <ol className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                        {newImageUrl.map((url, index) => (
                          <div className="relative" key={`rel${index}`}>
                            <p className="absolute bottom-0 rounded-full bg-white px-2 py-1 text-xs font-semibold">
                              {formState.imageNamesList.length + index}
                            </p>
                            <Image
                              className="h-full max-h-52 w-full max-w-52"
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
            </div>
            <div className="flex flex-col">
              <Label>Indice De La Imagen Principal</Label>
              <Input
                type="number"
                value={formState.mainImageIndex.toString()}
                onChange={(ev) =>
                  setFormState((prev) => ({
                    ...prev,
                    mainImageIndex:
                      ev.target.value === "" ? 0 : parseInt(ev.target.value),
                  }))
                }
              />
            </div>
          </div>
          <LoadingButton isLoading={isLoading} message="Confirmar Edición" />
          <p>{feedback}</p>
        </form>
      </div>
    </div>
  );
}
