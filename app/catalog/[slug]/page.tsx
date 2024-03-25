import CatalogPage from "@/components/pages/CatalogPage";
import { Category_ID } from "@/types/category";
export const revalidate = 0;
export default async function page({ params }: { params: { slug: string } }) {
  try {
    const paramObject = new URLSearchParams(decodeURIComponent(params.slug));
    const categoryID = paramObject.get("category") || "";
    const subCategoryID = paramObject.get("subCategory") || "";
    const page = paramObject.get("page") || "1";
    const publicStoreRes = await fetch(
      `${process.env.URL}/api/public/store?category=${categoryID}&subCategory=${subCategoryID}&page=${page}`,
    );
    const categoryRes = await fetch(`${process.env.url}/api/categories`);
    const categoryList = (await categoryRes.json()) as Category_ID[];
    const categoryName =
      categoryList.find((category) => category._id === categoryID)?.name || "";
    const subCategoryName =
      categoryList
        .flatMap((category) => category.subCategoryList)
        .find((subCategory) => subCategory.id === subCategoryID)?.name || "";
    const data = await publicStoreRes.json();
    const pagination = data.pagination;
    const storeItems = data.storeItems;
    return (
      <CatalogPage
        pagination={pagination}
        storeItems={storeItems}
        category={categoryName}
        subCategory={subCategoryName}
        categoryID={categoryID}
        subCategoryID={subCategoryID}
      />
    );
  } catch (error) {
    console.error(error);
    return <div>Not Found</div>;
  }
}
