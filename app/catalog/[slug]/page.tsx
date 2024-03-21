import CatalogPage from "@/components/pages/CatalogPage";

export default async function page({ params }: { params: { slug: string } }) {
  const paramObject = new URLSearchParams(decodeURIComponent(params.slug));
  const categoryID = paramObject.get("category");
  const subCategoryID = paramObject.get("subCategory");
  const res = await fetch(
    `${process.env.URL}/api/public/store?category=${categoryID}&subCategory=${subCategoryID}`,
  );
  const data = await res.json();
  const pagination = data.pagination;
  const storeItems = data.storeItems;
  return <CatalogPage pagination={pagination} storeItems={storeItems} />;
}
