import { OPTIONS } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import CatalogPage from "@/components/pages/CatalogPage";
import dbConnect from "@/lib/dbConnect";
import { categoryModel } from "@/lib/models/category";
import { StoreItemModel } from "@/lib/models/storeItem";
import { Category_ID } from "@/types/category";
import { StoreItemDB_ID } from "@/types/storeItemDB";
import { getServerSession } from "next-auth";
import z from "zod";

export default async function page({ params }: { params: { slug: string } }) {
  const session = await getServerSession(OPTIONS);
  // Parse URL Params
  const paramObject = new URLSearchParams(decodeURIComponent(params.slug));
  const categoryID = paramObject.get("category") ?? "";
  const subCategoryID = paramObject.get("subCategory") ?? "";
  const pageString = paramObject.get("page") ?? "1";
  const page = parseInt(pageString) ?? 1;
  const itemsPerPage = 20; // Should never be 0

  //Validate URL Params
  const paramValidator = z.object({
    page: z.number().min(0),
    category: z.string().max(50).optional(),
    subCategory: z.string().max(50).optional(),
  });
  try {
    paramValidator.parse({ page, categoryID, subCategoryID });
  } catch (error) {
    console.error(error);
    return <div>Invalid URL Params</div>;
  }
  type filter = {
    categoryIDList?: string;
    subCategoryIDList?: string;
  };
  const filter: filter = {};
  if (categoryID) filter["categoryIDList"] = categoryID;
  if (subCategoryID) filter["subCategoryIDList"] = subCategoryID;

  try {
    await dbConnect();
    const skip = (page - 1) * itemsPerPage;
    const mongooseStoreItems = (await StoreItemModel.find({
      ...(categoryID && { categoryIDList: { $in: [categoryID] } }),
      ...(subCategoryID && { subCategoryIDList: { $in: [subCategoryID] } }),
    })
      .lean()
      .skip(skip)
      .limit(itemsPerPage)) as StoreItemDB_ID[];
    const storeItems = JSON.parse(
      JSON.stringify(mongooseStoreItems),
    ) as StoreItemDB_ID[];

    // Calculate total number of items for pagination metadata
    const totalItems = await StoreItemModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pagination = {
      totalItems,
      totalPages,
      currentPage: page,
      itemsPerPage: itemsPerPage,
      hasNextPage: page < totalPages,
    };
    //Categories
    const categoryData = await categoryModel.find({}).lean();
    const categoryList = JSON.parse(
      JSON.stringify(categoryData),
    ) as Category_ID[];
    const categoryName =
      categoryList.find((category) => category._id === categoryID)?.name || "";
    const subCategoryName =
      categoryList
        .flatMap((category) => category.subCategoryList)
        .find((subCategory) => subCategory.id === subCategoryID)?.name || "";
    return (
      <CatalogPage
        pagination={pagination}
        storeItems={storeItems}
        category={categoryName}
        subCategory={subCategoryName}
        categoryID={categoryID}
        subCategoryID={subCategoryID}
        session={session}
      />
    );
  } catch (error) {
    return <div>Error Fetching Data</div>;
  }
}
