import "next-auth";
import User from "./types/user";
//Extending the Session interface to include the id property
declare module "next-auth" {
  interface Session {
    user: User;
  }
}
//Extending the NodeJS namespace to include the process.env variables
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_CONNECTION_STRING: string;
      GOOGLE_AUTH_CLIENT_ID: string;
      GOOGLE_AUTH_CLIENT_SECRET: string;
      NEXTAUTH_URL: string;
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
    }
  }
}

export {};
