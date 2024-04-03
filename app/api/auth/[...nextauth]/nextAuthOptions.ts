import dbConnect from "@/lib/dbConnect";
import createUser from "@/lib/factory/createUser";
import isRegisteredUser from "@/lib/isRegisteredUser";
import { UserModel } from "@/lib/models/user";
import { Role, User_ID } from "@/types/user";
import Google from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";

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
            params.user.image ?? "",
            params.user.email,
          );
          await UserModel.create(newUser);
        }
        return true;
      } catch (error) {
        console.error("Error in signIn callback", error);
        return false;
      }
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }
      await dbConnect();
      const dbUser = (await UserModel.findOne({
        googleId: token.sub,
      })) as User_ID;
      token.role = dbUser?.role; // Add the user role to the token
      token._id = dbUser?._id.toString();
      return token;
    },
    /* This function is triggered whenever a session is accessed. It adds the user's ID from the token to the session object. */
    async session({ session, token }) {
      if (token) {
        session.user.googleId = token.sub as string;
        session.user.profileImage = token.picture ?? "";
        session.user.role = token.role as Role.USER | Role.ADMIN;
        session.user._id = token._id as string;
      }
      return session;
    },
  },
};
