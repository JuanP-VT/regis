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
import { NewStoreItem } from "@/types/storeItemDB";
import { Category_ID } from "@/types/category";
import CategorySelectMenu from "@/components/composed/CategorySelectMenu";
import PulseLoader from "react-spinners/PulseLoader";
import { Button } from "@/components/ui/button";
import SubCategorySelectMenu from "@/components/composed/SubCategorySelectMenu";
import type { PresignedPost } from "@aws-sdk/s3-presigned-post";
import { Progress } from "@/components/ui/progress";

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
    subCategoryIDList: [],
    secondaryImageIndex: 0,
  });
  const [imagesUrl, setImagesUrl] = useState<String[]>([]); // is displayed in the dropzone as feedback
  const [imageFiles, setImageFiles] = useState<File[]>([]); // Image Files to be uploaded
  const [isLoading, setIsLoading] = useState(false); //Loading state
  const [feedback, setFeedback] = useState(""); //Feedback to the user
  const [details, setDetails] = useState(""); //Details of the product
  //States to handle category and subcategory selection
  const [selectedCategoriesID, setSelectedCategoriesID] = useState<string[]>(
    [],
  );
  const [selectedSubCategoriesID, setSelectedSubCategoriesID] = useState<
    string[]
  >([]);
  //Upload progress
  const [uploadProgress, setUploadProgress] = useState(0);
  const progressPercentage = (uploadProgress / imageFiles.length) * 100;
  //Get subcategory list from selected categories
  const availableSubCategoryList = categoryList
    .filter((category) => selectedCategoriesID.includes(category._id))
    .map((category) => category.subCategoryList)
    .flat();

  //Handle form submission
  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setIsLoading(true);
    //Create form data to sent to the server
    const formData = new FormData();
    formData.append("fileName", formValue.fileName);
    formData.append("storeItemName", formValue.storeItemName);
    formData.append("categoryIDList", JSON.stringify(selectedCategoriesID));
    formData.append("price", formValue.price.toString());
    formData.append(
      "discountPercentage",
      formValue.discountPercentage.toString(),
    );
    formValue.images?.forEach((image) => {
      formData.append("imageNames", image.name);
    });
    formData.append("mainImageIndex", formValue.mainImageIndex.toString());
    formData.append(
      "secondaryImageIndex",
      formValue.secondaryImageIndex.toString(),
    );
    formData.append("details", details);
    formData.append(
      "subCategoryIDList",
      JSON.stringify(selectedSubCategoriesID),
    );
    //Send the form data to the server
    const response = await fetch("/api/store", {
      method: "POST",
      body: formData,
    });
    //Handle  error status
    if (response.status === 400) {
      setFeedback("Solicitud incorrecta, verifica los campos");
      setIsLoading(false);
    }
    if (response.status === 409) {
      setFeedback("Conflicto, ya existe un registro con ese nombre");
      setIsLoading(false);
    }
    if (response.status === 500) {
      setFeedback("Hubo un error en el servidor");
      setIsLoading(false);
    }
    //If the response is OK, we can upload the images to S3
    if (response.status === 200) {
      type ApiResponse = {
        presignedPostsData: {
          imageUrl: string;
          key: string;
          presignedPost: PresignedPost;
          fileName: string;
        }[];
      };
      //Get presigned posts for images
      const data = (await response.json()) as ApiResponse;

      // Upload each image to S3
      const uploadPromises = data.presignedPostsData.map(async (post) => {
        // Create a new FormData instance
        const formData = new FormData();

        // Append the fields from the presigned post
        for (const field in post.presignedPost.fields) {
          formData.append(field, post.presignedPost.fields[field]);
        }

        // Append the file associated with this presigned post
        const fileToUpload = imageFiles.find(
          (file) => file.name === post.fileName,
        );
        if (fileToUpload) formData.append("file", fileToUpload);

        // Make a POST request to the presigned URL
        return fetch(post.presignedPost.url, {
          method: "POST",
          body: formData,
        }).then((response) => {
          setUploadProgress((prev) => prev + 1);
          return response;
        });
      });

      // Wait for all uploads to finish
      const uploadResponses = await Promise.all(uploadPromises);

      // Check if all uploads were successful
      const allUploadsSucceeded = uploadResponses.every(
        (response) => response.ok,
      );
      if (allUploadsSucceeded) {
        setFeedback("Producto agregado con éxito");
      } else {
        setFeedback("Hubo un error subiendo las imágenes");
      }
      setTimeout(() => {
        window.location.reload();
      }, 1000);
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
            setSelectedSubCategoriesID={setSelectedSubCategoriesID}
            setCategoryIDList={setSelectedCategoriesID}
            selectedCategoriesID={selectedCategoriesID}
          />
          <SubCategorySelectMenu
            selectedSubCategoriesID={selectedSubCategoriesID}
            setSelectedSubCategoriesID={setSelectedSubCategoriesID}
            subCategoryList={availableSubCategoryList}
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
              setImageFiles(acceptedFiles); // Update imageFiles
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
            placeholder="Imagen Principal"
          />
          <Label className="mt-4">Indice De La Imagen Secundaria</Label>
          <Input
            type="number"
            onChange={(ev) =>
              setFormValue((prevState) => ({
                ...prevState,
                secondaryImageIndex:
                  ev.target.value === "" ? 0 : parseInt(ev.target.value),
              }))
            }
            placeholder="Indice Secundario"
          />
          <Label className="my-3">Detalles del producto</Label>
          <Tiptap onChange={setDetails} />
          {isLoading ? (
            <>
              <Progress value={progressPercentage} />
              <PulseLoader size={2} />
            </>
          ) : (
            <Button className="my-2">Agregar</Button>
          )}
          <p className="text-sm"> {feedback}</p>
        </form>
      </div>
    </div>
  );
}
