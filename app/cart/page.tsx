"use client";
import ShoppingCartPage from "@/components/pages/ShoppingCartPage";
/**
 * Although it may seem unusual to have a page that merely calls a component, this is a standard practice within this project.
 * Each route begins with a 'page.tsx' server component, which in turn invokes the actual component. This structure enhances modularity and maintainability.
 */
export default function Page() {
  return <ShoppingCartPage />;
}
