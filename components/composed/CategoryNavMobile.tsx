import { Category_ID } from "@/types/category";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { Button } from "../ui/button";
type Props = {
  categoryList: Category_ID[];
};
export default function CategoryNavMobile({ categoryList }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  //Separate categories with no subcategories because these ones are going to be render as a link not as a menu
  const categoriesWithNoSubcategories = categoryList.filter(
    (category) => !category.subCategoryList?.length,
  );
  const categoriesWithSubcategories = categoryList.filter(
    (category) => category.subCategoryList?.length,
  );
  return (
    <div className="h-min w-min">
      <Button variant="outline" className="bg-light-brown z-50">
        <MenuIcon
          onClick={() => setIsOpen(!isOpen)}
          className={`absolute  z-50 m-1 cursor-pointer  text-blue-500`}
        />
      </Button>
      <div className={`absolute ${isOpen ? "z-50" : "-z-10"}`}>
        <div
          className={` bg-light-brown flex min-w-60 flex-col rounded-lg  pb-5 ${isOpen ? "z-50 -translate-x-0" : "-z-10 -translate-x-full"} transition-all duration-500`}
        >
          <p className="m-2 p-2   font-semibold ">Categorías</p>
          <Accordion type="single" collapsible className="w-full ">
            <Link
              onClick={() => {
                setTimeout(() => {
                  setIsOpen(false);
                }, 100);
              }}
              className="flex w-full border-b border-b-slate-100 p-4 text-sm font-semibold capitalize text-accent-foreground underline-offset-2
                             transition-all duration-500 hover:text-sky-500 hover:underline "
              href={`/catalog/category=&subCategory=&page=1`}
            >
              Catálogo Completo
            </Link>
            <div className="flex flex-col  px-2">
              {categoriesWithNoSubcategories?.map((category, index) => (
                <Link
                  key={`category${index}`}
                  onClick={() => {
                    setTimeout(() => {
                      setIsOpen(false);
                    }, 100);
                  }}
                  className="border-b border-b-slate-200  p-3 text-sm font-semibold capitalize text-accent-foreground underline-offset-2
                             transition-all duration-500 hover:text-sky-500 hover:underline "
                  href={`/catalog/category=${category._id}&subCategory=&page=1`}
                >
                  {category.name}
                </Link>
              ))}
            </div>
            {categoriesWithSubcategories?.map((category, index) => (
              <AccordionItem
                className="border-b border-b-slate-200"
                key={`category${index}`}
                value={category.name}
              >
                <AccordionTrigger className="ml-2 p-2 py-3 text-sm capitalize">
                  {category.name}
                </AccordionTrigger>
                <AccordionContent className="flex flex-col ">
                  <Link
                    onClick={() => {
                      setTimeout(() => {
                        setIsOpen(false);
                      }, 100);
                    }}
                    className=" p-2 text-xs font-semibold capitalize text-accent-foreground underline-offset-2
                             transition-all duration-500 hover:text-sky-500 hover:underline "
                    href={`/catalog/category=${category._id}&subCategory=&page=1`}
                  >
                    {category.name}
                  </Link>
                  {category.subCategoryList?.map((subCategory, index) => (
                    <Link
                      key={`subCategory${index}`}
                      onClick={() => {
                        setTimeout(() => {
                          setIsOpen(false);
                        }, 100);
                      }}
                      className="p-2 text-xs font-semibold capitalize text-accent-foreground underline-offset-2
                             transition-all duration-500 hover:text-sky-500 hover:underline "
                      href={`/catalog/category=${category._id}&subCategory=${subCategory.id}&page=1`}
                    >
                      {subCategory.name}
                    </Link>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
