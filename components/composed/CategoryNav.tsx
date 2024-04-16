"use client";
import { Category_ID } from "@/types/category";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import CategoryNavMobile from "./CategoryNavMobile";

type Props = {
  categoryList: Category_ID[];
};
/*
  
  This component is used to render the categories and subcategories in the catalog page.
  It receives a list of categories and subcategories and renders them as a list of links.
  If a category has subcategories, it renders the category as a link and the subcategories as a dropdown menu.
  If a category has no subcategories, it renders the category as a link.
  Contains a separate component for the mobile version
*/
export default function CategoryNav({ categoryList }: Props) {
  //Separate categories with no subcategories because these ones are going to be render as a link not as a menu
  const categoriesWithNoSubcategories = categoryList.filter(
    (category) => !category.subCategoryList?.length,
  );
  const categoriesWithSubcategories = categoryList.filter(
    (category) => category.subCategoryList?.length,
  );
  return (
    <>
      <div className="absolute flex sm:hidden ">
        <CategoryNavMobile categoryList={categoryList} />
      </div>
      <div className="hidden sm:flex">
        <Link
          className="p-3  text-xs font-semibold capitalize text-accent-foreground underline-offset-2
          transition-all duration-500 hover:text-sky-500 hover:underline "
          href={`/catalog/category=&subCategory=&page=1`}
        >
          Todos
        </Link>
        {categoriesWithNoSubcategories?.map((category, index) => (
          <Link
            key={`option${index}`}
            className="hover: p-3 text-xs font-semibold capitalize text-accent-foreground underline-offset-2
          transition-all duration-500 hover:text-sky-500 hover:underline"
            href={`/catalog/category=${category._id}&subCategory=&page=1`}
          >
            {category.name}
          </Link>
        ))}
        {categoriesWithSubcategories?.map((category, index) => (
          <NavigationMenu key={`option${index}`}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-xs capitalize">
                  {category.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <Link
                    className="group  flex min-w-48  flex-col p-3  text-xs "
                    href={`/catalog/category=${category._id}&subCategory=&page=1`}
                  >
                    <p className="w-auto border-b border-b-transparent text-xs capitalize  transition-all duration-500 hover:text-sky-500 group-hover:text-sky-700">
                      {category.name}
                    </p>
                  </Link>

                  {category.subCategoryList?.map((subCategory, index) => (
                    <Link
                      key={`${subCategory}-${index}`}
                      href={`/catalog/category=${category._id}&subCategory=${subCategory.id}&page=1`}
                      className="group  flex min-w-32  flex-col p-3  text-sm"
                    >
                      <p className="w-auto border-b border-b-transparent  capitalize transition-all duration-500  hover:text-sky-500 group-hover:text-sky-700">
                        {subCategory.name}
                      </p>
                    </Link>
                  ))}
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        ))}
      </div>
    </>
  );
}
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
