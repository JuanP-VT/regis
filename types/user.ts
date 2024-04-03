//Represents the structure of a user in the database
export enum Role {
  USER = "user",
  ADMIN = "admin",
}

export interface User {
  googleId: string;
  name: string;
  role: Role;
  profileImage: string;
  purchasedItems: string[];
  email: string | undefined | null;
}
export interface User_ID extends User {
  _id: string;
}
export default User;
