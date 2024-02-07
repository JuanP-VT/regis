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
