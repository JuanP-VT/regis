import { z } from "zod";

// Define the allowed extensions
const allowedExtensions = ["jpg", "png", "gif"];

export const ValidateNewFileApi = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) => allowedExtensions.includes(file.name.split(".").pop() || ""),
      {
        message: `Solo se permiten las extensiones: ${allowedExtensions.join(
          ", "
        )}`,
      }
    ),
});
