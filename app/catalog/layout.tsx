import CategoryNav from "@/components/composed/CategoryNav";
import dbConnect from "@/lib/dbConnect";
import { categoryModel } from "@/lib/models/category";
import { Category_ID } from "@/types/category";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  try {
    await dbConnect();
    const categoryData = (await categoryModel.find({}).lean()) as Category_ID[];
    const categoryList = JSON.parse(JSON.stringify(categoryData));

    return (
      <div lang="en">
        <CategoryNav categoryList={categoryList} />
        {children}
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div>Error Interno</div>;
  }
}
