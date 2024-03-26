import CategoryNav from "@/components/composed/CategoryNav";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const res = await fetch(`${process.env.URL}/api/categories`);
  const categoryList = await res.json();
  return (
    <div lang="en">
      <CategoryNav categoryList={categoryList} />
      {children}
    </div>
  );
}
