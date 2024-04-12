"use client";
import LoadingButton from "@/components/LoadingButton";
import CategorySelectMenu from "@/components/composed/CategorySelectMenu";
import SubCategorySelectMenu from "@/components/composed/SubCategorySelectMenu";
import Tiptap from "@/components/composed/Text Editor/TipTap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Category_ID } from "@/types/category";
import { StoreItemDB_ID } from "@/types/storeItemDB";
import Image from "next/image";
import { useState } from "react";
import Dropzone from "react-dropzone";
import type { PresignedPost } from "@aws-sdk/s3-presigned-post";

type Props = {
  storeItem: StoreItemDB_ID;
  categoryList: Category_ID[];
};
/**
 * Page to edit store items in the admin panel
 * Dynamic route : /admin/store-edit/[id]
 */
//Future TODO: refactor SelectCategoryMenu & SelectSubCategoryMenu into a single component
export default function StoreItemEditPage({ storeItem, categoryList }: Props) {
  const [feedback, setFeedback] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formState, setFormState] = useState<StoreItemDB_ID>(storeItem);
  const [details, setDetails] = useState<string>(storeItem.details);
  const [newImageFiles, setNewImageFiles] = useState<File[]>([]);
  const [newImageUrl, setNewImageUrl] = useState<string[]>([]);
  const [selectedCategoriesID, setSelectedCategoriesID] = useState<string[]>(
    storeItem.categoryIDList,
  );
  const [selectedSubCategoriesID, setSelectedSubCategoriesID] = useState<
    string[]
  >(storeItem.subCategoryIDList ?? []);

  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    setIsLoading(true);
    ev.preventDefault();
    const formData = new FormData();
    //Append all the form data
    formData.append("storeItemID", formState._id);
    formData.append("fileName", formState.fileName);
    formData.append("categoryIDList", JSON.stringify(selectedCategoriesID));
    formData.append(
      "subCategoryIDList",
      JSON.stringify(selectedSubCategoriesID),
    );

    formData.append("storeItemName", formState.storeItemName);
    formData.append("price", formState.price.toString());
    formData.append(
      "discountPercentage",
      formState.discountPercentage.toString(),
    );
    formData.append("details", details);
    formData.append("mainImageIndex", formState.mainImageIndex.toString());
    formData.append(
      "secondaryImageIndex",
      formState.secondaryImageIndex?.toString(),
    );
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
    //Send the form data to the server
    const res = await fetch("/api/store/edit", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      //Get presigned posts for images
      const data = await res.json();
      const presignedPosts = data.presignedPosts as PresignedPost[];
      const newImages = data.newImages as string[];
      // Upload each image to S3
      const uploadPromises = presignedPosts.map((post, index) => {
        // Create a new FormData instance
        const formData = new FormData();

        // Append the fields from the presigned post
        for (const field in post.fields) {
          formData.append(field, post.fields[field]);
        }

        // Api will return the file name in the newImages array
        // Append the file associated with this presigned post
        const file = newImageFiles.find(
          (imageFile) => imageFile.name === newImages[index],
        );
        formData.append("file", file as Blob);

        // Make a POST request to the presigned URL
        return fetch(post.url, {
          method: "POST",
          body: formData,
        });
      });

      // Wait for all uploads to finish
      const uploadResponses = await Promise.all(uploadPromises);
      // Check if all uploads were successful
      const successfulUploads = uploadResponses.every((res) => res.ok);
      if (successfulUploads) {
        setFeedback("Edición Exitosa");
      } else {
        setFeedback("Error al subir imágenes");
      }
    }
  }

  //Get subcategory list from selected categories
  const availableSubCategoryList = categoryList
    .filter((category) => selectedCategoriesID.includes(category._id))
    .map((category) => category.subCategoryList)
    .flat();

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
              selectedCategoriesID={selectedCategoriesID}
              setCategoryIDList={setSelectedCategoriesID}
              setSelectedSubCategoriesID={setSelectedSubCategoriesID}
            />
          </div>
          <div className="flex flex-col">
            <SubCategorySelectMenu
              subCategoryList={availableSubCategoryList}
              selectedSubCategoriesID={selectedSubCategoriesID}
              setSelectedSubCategoriesID={setSelectedSubCategoriesID}
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
              <Label className="my-2">Indice De La Imagen Principal</Label>
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
              <Label className="my-2">Indice De La Imagen Secundaria</Label>
              <Input
                type="number"
                value={formState.secondaryImageIndex?.toString()}
                onChange={(ev) =>
                  setFormState((prev) => ({
                    ...prev,
                    secondaryImageIndex:
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
