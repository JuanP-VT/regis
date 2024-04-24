import { Session } from "next-auth";
import { Button } from "../ui/button";
import { signIn, signOut } from "next-auth/react";

/* 
  Button to sign in with the next-auth library
*/
type Props = {
  session: Session | null;
};
export default function SignInButton({ session }: Props) {
  return (
    <Button
      className="rounded-xl border-rose-100 bg-white px-3 text-xs text-amber-600 hover:bg-sky-100 hover:text-amber-600"
      size="sm"
      variant="outline"
      onClick={session ? () => signOut() : () => signIn()}
    >
      {session ? "Cerrar sesión" : "Iniciar sesión"}
    </Button>
  );
}
