import ShoppingCartPage from "@/components/pages/ShoppingCartPage";
import { getServerSession } from "next-auth";
import { OPTIONS } from "../api/auth/[...nextauth]/nextAuthOptions";

export default async function Page() {
  const session = await getServerSession(OPTIONS);
  return <ShoppingCartPage session={session} />;
}
