// The way to do this came from https://stackoverflow.com/questions/37377731/extend-express-request-object-using-typescript
declare namespace Express {
  export interface User {
    _id?: ObjectId;
    username?: string;
    firstName?: string;
    lastName?: string;
    role?: "user" | "admin";
  }

  export interface CustomRequest extends Request {
    user?: User;
  }
}
