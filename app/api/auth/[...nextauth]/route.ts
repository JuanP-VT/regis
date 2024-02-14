import NextAuth from "next-auth";
import { OPTIONS } from "./nextAuthOptions";
/**
 *
 * This module sets up and configures the NextAuth library for user authentication in a Next.js application.
 * It exports a `handler` function that can be used as a GET or POST request handler in Next.js API routes.
 *
 * @module route.ts
 * @exports GET
 * @exports POST
 */

/**
 * The main export of the file. It's a function created by calling `NextAuth` with the `OPTIONS` object.
 * This function can handle GET and POST requests for the Next.js API route where it's used.
 *
 */
const handler = NextAuth(OPTIONS);

export { handler as GET, handler as POST };
