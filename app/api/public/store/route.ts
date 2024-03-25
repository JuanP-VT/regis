import { NextResponse } from "next/server";
import { StoreItemModel } from "@/lib/models/storeItem";
import { StoreItemDB } from "@/types/storeItemDB";
import z from "zod";
import dbConnect from "@/lib/dbConnect";

//Fetch paginated items based on query filters
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const itemsPerPage = 2;
  const page = Math.abs(Number(searchParams.get("page"))) || 1;
  const category = searchParams.get("category");
  const subCategoryParam = searchParams.get("subCategory");
  let subCategory = subCategoryParam === "" ? undefined : subCategoryParam;
  //Convert values to default for invalid query params
  //Url Param Validation
  const paramValidator = z.object({
    page: z.number().min(0),
    category: z.string().max(50),
    subCategory: z.string().max(50).optional(),
  });
  try {
    paramValidator.parse({ page, category, subCategory });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    } else {
      return NextResponse.json({ message: "An Unknown error ocurred" });
    }
  }
  type filter = {
    categoryIDList?: string;
    subCategoryIDList?: string;
  };
  const filter: filter = {};
  if (category) filter["categoryIDList"] = category;
  if (subCategory) filter["subCategoryIDList"] = subCategory;
  try {
    await dbConnect();
    const skip = (page - 1) * itemsPerPage;
    const storeItems = (await StoreItemModel.find({
      ...(category && { categoryIDList: { $in: [category] } }),
      ...(subCategory && { subCategoryIDList: { $in: [subCategory] } }),
    })
      .skip(skip)
      .limit(itemsPerPage)) as StoreItemDB[];
    // Calculate total number of items for pagination metadata
    const totalItems = await StoreItemModel.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return NextResponse.json({
      storeItems,
      pagination: {
        totalItems,
        totalPages,
        currentPage: page,
        itemsPerPage: itemsPerPage,
        hasNextPage: page < totalPages,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "An error occurred fetching the store items",
      },
      { status: 500 },
    );
  }
}
