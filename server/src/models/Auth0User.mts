import { prop, getModelForClass, DocumentType } from "@typegoose/typegoose";

class Auth0User {
  @prop({ required: true, unique: true })
  sub!: string;

  @prop({ required: true, unique: true })
  email!: string;

  @prop({ required: true, default: true })
  isPending!: boolean;

  @prop({ type: () => [String], required: true, default: [] })
  roles!: string[];
}

export const Auth0UserModel = getModelForClass(Auth0User);
export type Auth0UserDocument = DocumentType<Auth0User>;
