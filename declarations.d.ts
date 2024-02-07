import "next-auth";
//Extending the Session interface to include the id property
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    };
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
    }
  }
}

export {};
