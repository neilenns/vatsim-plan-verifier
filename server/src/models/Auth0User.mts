import { prop, getModelForClass, DocumentType, ReturnModelType } from "@typegoose/typegoose";
import { ManagementClient } from "auth0";
import { ENV } from "../env.mjs";
import mainLogger from "../logger.mjs";

const logger = mainLogger.child({ service: "auth0user" });

class Auth0User {
  @prop({ required: true, unique: true })
  sub!: string;

  @prop({ required: true })
  email!: string;

  @prop({ required: true, default: true })
  isPending!: boolean;

  @prop({ type: () => [String], required: true, default: [] })
  roles!: string[];

  public static async findOrCreate(this: ReturnModelType<typeof Auth0User>, sub: string) {
    // Check for an existing user in the database first and return that if found.
    const existingUser = await this.findOne({ sub }).cacheQuery({ ttl: 30 });

    if (existingUser) {
      return existingUser;
    }

    // If no user is found in the database then create a placeholder
    // one with a flag indicating it isn't approved yet. This requires
    // a call to Auth0 to get the email address for the user.
    const management = new ManagementClient({
      domain: ENV.AUTH0_DOMAIN,
      clientId: ENV.AUTH0_CLIENT_ID,
      clientSecret: ENV.AUTH0_CLIENT_SECRET,
    });

    const result = await management.users.get({ id: sub });

    if (!result) {
      return undefined;
    }

    const newUser = await new Auth0UserModel({
      sub,
      email: result.data.email,
      isPending: true,
    }).save();

    logger.debug(`Stored new user ${sub}`);

    return newUser;
  }
}

export const Auth0UserModel = getModelForClass(Auth0User);
export type Auth0UserDocument = DocumentType<Auth0User>;
