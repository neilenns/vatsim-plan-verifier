// Define the interface for the User
export interface IUser {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  role: "admin" | "user";
}
