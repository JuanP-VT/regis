import "next-auth";
import User, { User_ID } from "./types/user";
//Extending the Session interface to include the id property
declare module "next-auth" {
  interface Session {
    user: User_ID;
  }
}
//Extending the NodeJS namespace to include the process.env variables
declare global {
  var mongoose: any; // This was done to avoid ts error "Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature."
  namespace NodeJS {
    interface Global {
      mongoose: {
        conn: any;
        promise: any;
      };
    }
    interface ProcessEnv {
      MONGODB_URI: string;
      GOOGLE_AUTH_CLIENT_ID: string;
      GOOGLE_AUTH_CLIENT_SECRET: string;
      NEXTAUTH_URL: string;
      S3_ACCESS_KEY_ID: string;
      S3_SECRET_ACCESS_KEY: string;
      URL: string;
      CLOUDFRONT_URL: string;
      S3_IMAGE_BUCKET_NAME: string;
      S3_FILES_BUCKET_NAME: string;
      NEXT_PUBLIC_PAYPAL_CLIENT_ID: string;
      PAYPAL_CLIENT_SECRET: string;
    }
  }
}

export {};
