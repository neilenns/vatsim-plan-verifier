import { Schema, model } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

export interface ISession {
  refreshToken: string;
}

// Define the interface for the Location document
export interface IUser {
  username: string;
  firstName: string;
  lastName: string;
  authStrategy: string;
  isVerified: boolean;
  refreshToken: ISession[];
}

const Session = new Schema<ISession>({
  refreshToken: {
    type: String,
    default: "",
  },
});

const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  authStrategy: { type: String, default: "local" },
  refreshToken: { type: [Session] },
  isVerified: { type: Boolean, default: false },
});

// Remove refreshToken from json responses for security
//Remove refreshToken from the response
userSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.refreshToken;
    return ret;
  },
});

userSchema.plugin(passportLocalMongoose);

export const User = model<IUser>("User", userSchema);
