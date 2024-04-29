import { getServerSession } from "next-auth";
import React from "react";
import { OPTIONS } from "../api/auth/[...nextauth]/nextAuthOptions";
import ProfilePageProducts from "@/components/pages/ProfilePage";

//User Profile Page
export default async function Page() {
  try {
    const session = await getServerSession(OPTIONS);

    if (!session) {
      return <div>Unauthorized</div>;
    }

    return <ProfilePageProducts user={session.user} />;
  } catch (error) {
    return <div>Error Al Autentificar</div>;
  }
}
