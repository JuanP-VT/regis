import CategoryNav from "@/components/composed/CategoryNav";
import { categoryModel } from "@/lib/models/category";
import { Category_ID } from "@/types/category";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  try {
    const categoryList = (await categoryModel.find({}).lean()) as Category_ID[];

    return (
      <div lang="en">
        <CategoryNav categoryList={categoryList} />
        {children}
      </div>
    );
  } catch (error) {
    console.error(error);
    return <></>;
  }
}
