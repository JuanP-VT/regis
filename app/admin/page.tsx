import { getServerSession } from "next-auth";
import { OPTIONS } from "../api/auth/[...nextauth]/route";
import { Role } from "@/types/user";
import Link from "next/link";

export default async function Admin() {
  const session = await getServerSession(OPTIONS);
  const user = session?.user;
  if (!session || user?.role !== Role.ADMIN) {
    return <div>Unauthorized</div>;
  }
  return (
    <div>
      Hello {user?.name} You are {user?.role}
      <Link href="/admin/cutfiles">Agregar</Link>
    </div>
  );
}
