import { OPTIONS } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import AdminNav from "@/components/composed/AdminNav";
import CategoriesPage from "@/components/pages/admin/CategoriesPage";
import dbConnect from "@/lib/dbConnect";
import { categoryModel } from "@/lib/models/category";
import { Role } from "@/types/user";
import { getServerSession } from "next-auth";

export default async function Categories() {
  try {
    const session = await getServerSession(OPTIONS);
    if (!session || session.user.role !== Role.ADMIN) {
      return <div>Unauthorized</div>;
    }
  } catch (error) {
    return <div>Error al autentificar</div>;
  }

  try {
    await dbConnect();
    const request = await categoryModel.find({}).lean();
    const categoryList = JSON.parse(JSON.stringify(request));
    return (
      <>
        <AdminNav />
        <CategoriesPage categoryList={categoryList} />
      </>
    );
  } catch (error) {
    console.error(error);
    return <div>Error con la base de datos</div>;
  }
}
