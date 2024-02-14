import { OPTIONS } from "@/app/api/auth/[...nextauth]/nextAuthOptions";
import NewCutFilePage from "@/components/pages/admin/NewFilePage";
import { getServerSession } from "next-auth";
import React from "react";

type Props = {};

export default async function AddCutFile({}: Props) {
  const session = await getServerSession(OPTIONS);
  if (!session || session.user?.role !== "admin") {
    return <div>Unauthorized</div>;
  }
  return <NewCutFilePage />;
}
