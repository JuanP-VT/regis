"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import PulseLoader from "react-spinners/PulseLoader";
import { Category } from "@/types/category";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { DeleteIcon, PlusIcon } from "lucide-react";
/* 
   UI Component to allow user to register a new category to the system
*/
export function CreateNewCategory() {
  const [formState, setFormState] = useState<Category>({
    name: "",
    description: "",
    subCategories: [""],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
  async function handleSubmit() {
    setIsLoading(true);
    const newCategory: Category = {
      name: formState.name,
      description: formState.description,
      subCategories: formState.subCategories,
    };
    const req = await fetch("/api/categories", {
      body: JSON.stringify(newCategory),
      method: "POST",
    });
    if (req.ok) {
      setFeedback("Categoría creada");
      setTimeout(() => {
        location.reload();
      }, 2000);
    } else {
      setFeedback("Error al crear categoría");
      setIsLoading(false);
    }
  }
  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="my-2" variant="outline">
            Agregar Categoría
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Agregar Categoría</SheetTitle>
            <SheetDescription>
              Agrega una nueva categoría a la base de datos.
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="my-2 grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre
              </Label>
              <Input
                id="name"
                onChange={(ev) =>
                  setFormState((prev) => ({
                    ...prev,
                    name: ev.target.value,
                  }))
                }
                value={formState.name}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Descripción
              </Label>
              <Input
                id="description"
                onChange={(ev) =>
                  setFormState((prev) => ({
                    ...prev,
                    description: ev.target.value,
                  }))
                }
                value={formState.description}
                className="col-span-3"
              />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Label htmlFor="description" className="p-1">
                  Sub Categorías
                </Label>
                <PlusIcon
                  className="cursor-pointer hover:text-pink-500"
                  onClick={() => {
                    const updatedSubCategories = [...formState.subCategories];
                    updatedSubCategories.push("");
                    setFormState((prev) => ({
                      ...prev,
                      subCategories: updatedSubCategories,
                    }));
                  }}
                />
              </div>
              {formState.subCategories.map((subCategory, index) => (
                <div key={`sub${index}`} className="flex items-center gap-2">
                  <Input
                    onChange={(ev) => {
                      const updatedSubCategories = [...formState.subCategories];
                      updatedSubCategories[index] = ev.currentTarget.value;
                      setFormState((prev) => ({
                        ...prev,
                        subCategories: updatedSubCategories,
                      }));
                    }}
                    value={formState.subCategories[index]}
                    className="col-span-3"
                  />
                  <DeleteIcon
                    className="cursor-pointer hover:text-pink-500"
                    onClick={() => {
                      const updatedSubCategories = [...formState.subCategories];
                      const indexToDelete =
                        updatedSubCategories.indexOf(subCategory);
                      updatedSubCategories.splice(indexToDelete, 1);
                      setFormState((prev) => ({
                        ...prev,
                        subCategories: updatedSubCategories,
                      }));
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <SheetFooter>
            {isLoading ? (
              <PulseLoader size={7} />
            ) : (
              <Button onClick={() => handleSubmit()}>Agregar</Button>
            )}
          </SheetFooter>
          {feedback}
        </SheetContent>
      </Sheet>
    </div>
  );
}
