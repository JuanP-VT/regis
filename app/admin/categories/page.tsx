import { OPTIONS } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import AdminNav from "@/components/composed/AdminNav";
import CategoriesPage from "@/components/pages/admin/CategoriesPage";
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
    const request = await fetch(`${process.env.URL}/api/categories`);
    const categoryList = await request.json();
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
