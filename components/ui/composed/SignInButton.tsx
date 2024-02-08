import { Button } from "../button";
import { signIn } from "next-auth/react";

export default function SignInButton() {
  return (
    <Button
      className="items-start h-min"
      size="sm"
      variant="outline"
      onClick={() => signIn()}
    >
      Sign In
    </Button>
  );
}
