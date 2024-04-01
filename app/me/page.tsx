import { getServerSession } from "next-auth";
import React from "react";
import { OPTIONS } from "../api/auth/[...nextauth]/nextAuthOptions";
import ProfilePageProducts from "@/components/pages/ProfilePage";
import { purchaseOrderModel } from "@/lib/models/purchaseOrder";
import { PurchaseOrder } from "@/types/PurchaseOrder";

type Props = {};

export default async function Page({}: Props) {
  try {
    const session = await getServerSession(OPTIONS);

    if (!session) {
      return <div>Unauthorized</div>;
    }
    const userPurchases = (await purchaseOrderModel.find({
      userID: session.user._id,
    })) as PurchaseOrder[];
    const formatUserPurchases = JSON.parse(JSON.stringify(userPurchases));

    return (
      <ProfilePageProducts
        purchaseOrders={formatUserPurchases}
        user={session.user}
      />
    );
  } catch (error) {
    return <div>Error Al Autentificar</div>;
  }

  //Request user purchase orders
}
