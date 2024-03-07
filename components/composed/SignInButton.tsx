import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

/* 
  Button to sign in with the next-auth library
*/
export default function SignInButton() {
  return (
    <Button
      className="rounded-xl border-sky-100 bg-rose-200 px-5 "
      size="sm"
      variant="outline"
      onClick={() => signIn()}
    >
      Sign In
    </Button>
  );
}
