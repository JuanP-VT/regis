"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ValidateNewFileApi } from "@/lib/schema-validators/admin-new-file";
import { z } from "zod";
import AdminNav from "@/components/composed/AdminNav";
import PulseLoader from "react-spinners/PulseLoader";

/**
 * This is the `NewCutFilePage` component.
 *
 * It's a form that allows users to upload a file, specifically with a `.zip` extension.
 * The file is then sent to the `/api/new-file` endpoint for processing.
 *
 * The component handles both client-side and server-side validation:
 * - Client-side validation is done using the `ValidateNewFileApi` schema validator.
 * - Server-side validation feedback is displayed to the user.
 *
 * The component also provides feedback to the user in case of errors or successful file upload.
 *
 * The form includes a loading state, which is displayed as a `LoadingButton` while the file is being uploaded.
 */
export default function NewCutFilePage() {
  type Form = { file: File | null };
  const [formState, setFormState] = useState<Form>({
    file: null,
  });
  const [errorMessage, setErrorMessage] = useState<z.ZodError[]>([]);
  const [feedback, setFeedback] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  async function handleSubmit() {
    if (!formState.file) {
      setFeedback("No hay archivo seleccionado");
      setIsLoading(false);
      return;
    }
    //Cliente Validation
    setIsLoading(true);
    const validateData = ValidateNewFileApi.safeParse(formState);
    if (!validateData.success) {
      const errors = JSON.parse(validateData.error.message);
      setIsLoading(false);
      setErrorMessage(errors);
      return;
    }
    const formData = new FormData();
    formData.append("file", formState.file as Blob);
    const response = await fetch("/api/new-file", {
      method: "POST",
      body: formData,
    });
    //Remove client side validation feedback to display feedback from the server
    setErrorMessage([]);

    if (response.status === 409) {
      setFeedback("Ya existe un archivo con ese nombre");
      setIsLoading(false);
      return;
    }
    //Generic error
    if (!response.ok) {
      setFeedback("Error al agregar archivo");
      setIsLoading(false);
      return;
    }
    // Extract the pre-signed POST data from response
    const { presignedPost } = await response.json();
    const uploadData = new FormData();
    Object.entries(presignedPost.fields).forEach(([key, value]) => {
      uploadData.append(key, value as string);
    });

    uploadData.append("file", formState.file);
    const uploadResponse = await fetch(presignedPost.url, {
      method: "POST",
      body: uploadData,
    });
    if (uploadResponse.ok) {
      setFeedback("Archivo agregado exitosamente");
      setFormState((prevState) => ({
        ...prevState,
        file: null,
      }));

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      setFeedback("Error al agregar archivo");
    }
  }
  return (
    <div>
      <AdminNav />
      <div className="flex flex-col items-center p-2">
        <div>
          <h1 className="p-2 text-2xl">Agregar Archivo Para Vender</h1>
          <p className="p-2 text-sm">
            Solo se permiten archivos con la extensión <strong>.zip</strong>
          </p>
          <Input
            className="max-w-96 cursor-pointer"
            lang="es"
            placeholder="Subir Archivo"
            type="file"
            onChange={(ev) => {
              setErrorMessage([]);
              setFeedback("");
              if (ev.currentTarget.files) {
                const file = ev.currentTarget.files[0];
                setFormState((prevState) => ({
                  ...prevState,
                  file: file,
                }));
              }
            }}
          />
          <div className="my-2 flex flex-col text-xs text-red-600 underline">
            <p className="text-sm">{feedback}</p>

            {errorMessage.map((error, index) => (
              <p key={index}>{error.message}</p>
            ))}
          </div>
          {isLoading ? (
            <PulseLoader size={2} />
          ) : (
            <Button className="w-20" onClick={handleSubmit}>
              Agregar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
