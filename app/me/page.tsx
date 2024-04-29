import { getServerSession } from "next-auth";
import React from "react";
import { OPTIONS } from "../api/auth/[...nextauth]/nextAuthOptions";
import ProfilePageProducts from "@/components/pages/ProfilePage";
import { purchaseOrderModel } from "@/lib/models/purchaseOrder";
import { PurchaseOrder } from "@/types/PurchaseOrder";
import dbConnect from "@/lib/dbConnect";

type Props = {};

export default async function Page({}: Props) {
  try {
    const session = await getServerSession(OPTIONS);

    if (!session) {
      return <div>Unauthorized</div>;
    }

    return <ProfilePageProducts user={session.user} />;
  } catch (error) {
    return <div>Error Al Autentificar</div>;
  }

  //Request user purchase orders
}
