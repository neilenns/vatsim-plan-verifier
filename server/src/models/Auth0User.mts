import {
  getModelForClass,
  plugin,
  prop,
  type DocumentType,
  type ReturnModelType,
} from "@typegoose/typegoose";
import { ManagementClient } from "auth0";
import { SpeedGooseCacheAutoCleaner } from "speedgoose";
import { ENV } from "../env.mjs";
import mainLogger from "../logger.mjs";

const logger = mainLogger.child({ service: "auth0user" });

@plugin(SpeedGooseCacheAutoCleaner)
export class Auth0User {
  @prop({ required: true, unique: true })
  sub!: string;

  @prop({ required: true })
  email!: string;

  @prop({ required: true, default: true })
  isPending!: boolean;

  @prop({ type: () => [String], required: true, default: [] })
  roles!: string[];

  @prop({ required: false, default: "light" })
  colorMode!: string;

  @prop({ required: false, default: false })
  sortByCreatedAt!: boolean;

  @prop({ required: false, default: true })
  hideInformational!: boolean;

  @prop({ required: false, default: false })
  streamingMode!: boolean;

  @prop({ required: false, default: false })
  autoHideImported!: boolean;

  public static async findOrCreate(
    this: ReturnModelType<typeof Auth0User>,
    sub: string
  ): Promise<Auth0UserDocument | undefined> {
    // Check for an existing user in the database first and return that if found.
    const existingUser = await this.findOne({ sub });

    if (existingUser != null) {
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

    if (result === undefined) {
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
