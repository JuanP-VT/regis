"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ValidateNewFileApi } from "@/lib/schema-validators/admin-new-file";
import { z } from "zod";
import LoadingButton from "@/components/LoadingButton";
import AdminNav from "@/components/composed/AdminNav";

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
    if (response.ok) {
      setFeedback("Archivo Agregado");
      setTimeout(() => {
        location.reload();
      }, 2000);
      return;
    }
    if (response.status === 409) {
      setFeedback("Archivo ya existe");
      setIsLoading(false);
      return;
    }
    //Generic error
    if (!response.ok) {
      setFeedback("Error al agregar archivo");
      setIsLoading(false);
      return;
    }
  }
  return (
    <div>
      <AdminNav />
      <div className="flex flex-col p-2 items-center">
        <div>
          <h1 className="p-2 text-2xl">Agregar Archivo Para Vender</h1>
          <p className="text-sm p-2">
            Solo se permiten archivos con la extensión <strong>.zip</strong>
          </p>
          <Input
            className="cursor-pointer max-w-96"
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
          <div className="flex flex-col my-2 text-xs text-red-600 underline">
            <p className="text-sm">{feedback}</p>

            {errorMessage.map((error, index) => (
              <p key={index}>{error.message}</p>
            ))}
          </div>
          {isLoading ? (
            <LoadingButton isLoading={true} message="" />
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
