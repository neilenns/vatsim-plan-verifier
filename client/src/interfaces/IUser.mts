// Define the interface for the User
export type Role = "admin" | "user";
export interface IUser {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  role: Role;
  token: string;
}
