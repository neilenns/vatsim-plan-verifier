import { Schema, Types, model } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

export interface ISession {
  refreshToken: string;
}

// Define the interface for the Location document
export interface IUser {
  _id: Types.ObjectId;
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
userSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    delete ret.refreshToken;
    return ret;
  },
});

userSchema.plugin(passportLocalMongoose);

const UserModel = model<IUser>("User", userSchema);

export default UserModel;
