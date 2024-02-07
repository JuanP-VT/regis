/**
 * route.ts
 *
 * This module sets up and configures the NextAuth library for user authentication in a Next.js application.
 * It exports a `handler` function that can be used as a GET or POST request handler in Next.js API routes.
 *
 * @module route.ts
 * @exports OPTIONS
 * @exports GET
 * @exports POST
 */
import dbConnect from "@/lib/dbConnect";
import createUser from "@/lib/factory/createUser";
import isRegisteredUser from "@/lib/isRegisteredUser";
import { UserModel } from "@/lib/models/user";
import NextAuth, { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";

/**
 * Configuration options for NextAuth.
 *
 * @type {NextAuthOptions}
 */
export const OPTIONS: NextAuthOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    Google({
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
    }),
  ],
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  callbacks: {
    /** This function is triggered when a user tries to sign in. It checks if the user already exists in the database.
      If not, it connects to the database, creates a new user, and saves the new user to the database. */
    async signIn(params) {
      try {
        const userExists = await isRegisteredUser(params.user.id);
        if (!userExists) {
          await dbConnect();
          const newUser = createUser(
            params.user.id,
            params.user.name ?? "",
            params.user.image ?? ""
          );
          await UserModel.create(newUser);
        }
        return true;
      } catch (error) {
        console.error("Error in signIn callback", error);
        return false;
      }
    },
    /* This function is triggered whenever a session is accessed. It adds the user's ID from the token to the session object. */
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
};
/**
 * The main export of the file. It's a function created by calling `NextAuth` with the `OPTIONS` object.
 * This function can handle GET and POST requests for the Next.js API route where it's used.
 *
 */
const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };
