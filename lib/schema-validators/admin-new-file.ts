import { z } from "zod";

// Define the allowed extensions
const allowedExtensions = ["zip"];

export const ValidateNewFileApi = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) => allowedExtensions.includes(file.name.split(".").pop() || ""),
      {
        message: "Solo se permite la extension .zip",
      }
    ),
});
