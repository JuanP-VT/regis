"use client";
import {
  Sheet,
  SheetClose,
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
export function CreateNewCategory() {
  async function handleSubmit() {
    setIsLoading(true);
    const newCategory: Category = {
      name: formState.name,
      description: formState.description,
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
  const [formState, setFormState] = useState<Category>({
    name: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState("");
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
