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
type Props = {
  categoryList: Category_ID[];
};

export default function CategoryNav({ categoryList }: Props) {
  return (
    <div className="flex">
      <Link
        className="p-3 text-sm font-semibold"
        href={`/catalog/category=&subCategory=`}
      >
        Todos
      </Link>
      {categoryList?.map((category, index) => (
        <NavigationMenu key={`option${index}`}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="capitalize">
                {category.name}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <Link
                  className="group  flex min-w-32  flex-col p-3  text-sm"
                  href={`/catalog/category=${category._id}&subCategory=`}
                >
                  <p className="w-min border-b border-b-transparent  capitalize transition-all duration-500 group-hover:border-b-slate-500">
                    {category.name}
                  </p>
                </Link>

                {category.subCategoryList?.map((subCategory, index) => (
                  <Link
                    key={`${subCategory}-${index}`}
                    href={`/catalog/category=${category._id}&subCategory=${subCategory.id}`}
                    className="group  flex min-w-32  flex-col p-3  text-sm"
                  >
                    <p className="w-min border-b border-b-transparent  capitalize transition-all duration-500 group-hover:border-b-slate-500">
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
