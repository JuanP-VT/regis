import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { Category_ID } from "@/types/category";
import {
  CheckIcon,
  DeleteIcon,
  EditIcon,
  PlusIcon,
  TrashIcon,
  Undo2Icon,
} from "lucide-react";
import SyncLoader from "react-spinners/SyncLoader";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PulseLoader from "react-spinners/PulseLoader";
import { Button } from "@/components/ui/button";

type Props = {
  category: Category_ID;
  index: number;
};

// This component represents a category in the admin panel.
// It has a default display mode and an edit mode for modifications.
export default function CategoryCard({ category, index }: Props) {
  console.log(index);
  const [isOnEditMode, setIsOnEditMode] = useState(false);
  function DefaultDisplayMode({ category }: { category: Category_ID }) {
    const subCategoriesString = category.subCategories.join(", ");
    return (
      <TableRow
        className={`${index % 2 === 0 ? "bg-slate-100" : "bg-zinc-100"}  `}
      >
        <TableCell className="font-medium">{category.name}</TableCell>
        <TableCell className="font-medium">{category.description}</TableCell>
        <TableCell className="font-medium">{subCategoriesString}</TableCell>

        <TableCell className=" font-medium">
          <div className="flex justify-center gap-2 px-2">
            <Button
              variant="ghost"
              className="group"
              size="sm"
              onClick={() => setIsOnEditMode(true)}
            >
              <EditIcon className="h-4 w-4 cursor-pointer hover:scale-105 group-hover:text-pink-500" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    );
  }
  function EditMode({ category }: { category: Category_ID }) {
    const [formState, setFormState] = useState<Category_ID>({
      _id: category._id,
      name: category.name,
      description: category.description,
      subCategories: category.subCategories ?? [],
    });
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState("");
    async function handleEdit() {
      setIsLoading(true);
      const reqBody: Category_ID = {
        _id: formState._id,
        name: formState.name,
        description: formState.description,
        subCategories: formState.subCategories,
      };
      await fetch("/api/categories/edit", {
        method: "POST",
        body: JSON.stringify(reqBody),
      });

      setIsLoading(false);
      setIsOnEditMode(false);
      location.reload();
    }
    async function handleDelete() {
      setIsLoading(true);
      setFeedback("");
      const deleteResponse = await fetch("/api/categories/delete", {
        method: "POST",
        body: JSON.stringify({ _id: formState._id }),
      });
      if (deleteResponse.ok) {
        setFeedback("Categoría eliminada");
        location.reload();
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      }
      if (deleteResponse.status === 402) {
        setFeedback("La categoría está en uso");
        setIsLoading(false);
      }
    }
    return (
      <TableRow>
        <TableCell className="font-medium">
          <Input
            value={formState.name}
            onChange={(ev) =>
              setFormState((prev) => ({ ...prev, name: ev.target.value }))
            }
          />
        </TableCell>
        <TableCell className="font-medium">
          <Input
            value={formState.description}
            onChange={(ev) =>
              setFormState((prev) => ({
                ...prev,
                description: ev.target.value,
              }))
            }
          />
        </TableCell>
        <TableCell className="relative font-medium">
          {formState.subCategories?.map((subCategory, index) => (
            <div className="flex items-center gap-2" key={`in${index}`}>
              <Input
                className="my-1"
                value={formState.subCategories[index]}
                size={1}
                onChange={(ev) => {
                  const updatedSubCategories = [...formState.subCategories];
                  updatedSubCategories[index] = ev.currentTarget.value;
                  setFormState((prev) => ({
                    ...prev,
                    subCategories: updatedSubCategories,
                  }));
                }}
              />

              <DeleteIcon
                size={20}
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
        </TableCell>
        <TableCell className="font-medium">
          <div className="flex justify-between px-2">
            <PlusIcon
              className="h-4 w-4 cursor-pointer hover:scale-105 hover:text-pink-500"
              onClick={() => {
                const updatedSubCategories = formState.subCategories;
                updatedSubCategories.push("");
                setFormState((prev) => ({
                  ...prev,
                  subCategories: updatedSubCategories,
                }));
              }}
            />
            <Undo2Icon
              className="h-4 w-4 cursor-pointer hover:scale-105 hover:text-pink-500"
              onClick={() => setIsOnEditMode(false)}
            />
            {isLoading ? (
              <SyncLoader size={2} />
            ) : (
              <CheckIcon
                className="h-4 w-4 cursor-pointer hover:scale-105 hover:text-pink-500"
                onClick={() => handleEdit()}
              />
            )}
            <Dialog>
              <DialogTrigger asChild>
                <TrashIcon className="h-4 w-4 cursor-pointer hover:scale-105 hover:text-pink-500" />
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>¿Deseas Borrar Categoría?</DialogTitle>
                  <DialogDescription>
                    Los cambios son irreversibles, por seguridad, no podrás
                    borrar categorías que estén en uso . <br />
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4 text-sm">
                  <p>Categoría: {category.name}</p>
                </div>
                <DialogFooter>
                  {isLoading ? (
                    <PulseLoader />
                  ) : (
                    <Button onClick={() => handleDelete()}>Borrar</Button>
                  )}
                  <p className="py-2 text-sm text-slate-600">{feedback}</p>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </TableCell>
      </TableRow>
    );
  }

  if (isOnEditMode) {
    return <EditMode category={category} />;
  }

  return <DefaultDisplayMode category={category} />;
}
