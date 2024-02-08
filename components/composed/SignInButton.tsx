import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <Button
      className="rounded-xl px-5 bg-rose-200 border-sky-100 "
      size="sm"
      variant="outline"
      onClick={() => signIn()}
    >
      Sign In
    </Button>
  );
}
