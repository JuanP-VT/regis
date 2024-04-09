import CategoryNav from "@/components/composed/CategoryNav";
import dbConnect from "@/lib/dbConnect";
import { categoryModel } from "@/lib/models/category";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  try {
    await dbConnect();
    const res = await categoryModel.find({}).lean();
    const categoryList = JSON.parse(JSON.stringify(res));
    return (
      <div lang="en">
        <CategoryNav categoryList={categoryList} />
        {children}
      </div>
    );
  } catch (error) {
    console.error(error);
    return <div>Error con la base de datos</div>;
  }
}
