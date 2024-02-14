"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ValidateNewFileApi } from "@/lib/schema-validators/admin-cutfile-new";
import { z } from "zod";

export default function NewCutFilePage() {
  type Form = { file: File | null };
  const [formState, setFormState] = useState<Form>({
    file: null,
  });
  const [errorMessage, setErrorMessage] = useState<z.ZodError[]>([]);

  async function handleSubmit() {
    //Cliente Validation
    const validateData = ValidateNewFileApi.safeParse(formState);
    if (!validateData.success) {
      const errors = JSON.parse(validateData.error.message);
      setErrorMessage(errors);
      return;
    }
    const formData = new FormData();
    formData.append("file", formState.file as Blob);
    const response = await fetch("/api/new-file", {
      method: "POST",
      body: formData,
    });

    //Display feedback
    const data = await response.json();
    console.log(data);
  }
  return (
    <div className="flex flex-col">
      <Input
        placeholder="Subir Archivo"
        type="file"
        onChange={(ev) => {
          if (ev.currentTarget.files) {
            const file = ev.currentTarget.files[0];
            setFormState((prevState) => ({
              ...prevState,
              file: file,
            }));
          }
        }}
      />
      <div className="flex flex-col mt-2 text-xs text-red-600 underline">
        {errorMessage.map((error, index) => (
          <p key={index}>{error.message}</p>
        ))}
      </div>
      <Button className="h-5 w-20 p-3 text-xs mt-2" onClick={handleSubmit}>
        Agregar
      </Button>
    </div>
  );
}
