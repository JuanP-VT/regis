import { OPTIONS } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import NewCutFilePage from "@/components/pages/admin/NewFilePage";
import { Role } from "@/types/user";
import { getServerSession } from "next-auth";
import React from "react";

type Props = {};

export default async function AddCutFile({}: Props) {
  try {
    const session = await getServerSession(OPTIONS);
    if (!session || session.user.role !== Role.ADMIN) {
      return <div>Unauthorized</div>;
    }
  } catch (error) {
    return <div>Error en la autentificación</div>;
  }
  return <NewCutFilePage />;
}
