import mainLogger from "../logger.mjs";
import { Auth0User, Auth0UserDocument, Auth0UserModel } from "../models/Auth0User.mjs";
import Result from "../types/result.mjs";
import { Types } from "mongoose";

const logger = mainLogger.child({ service: "user" });

type Auth0UserResult = Result<Auth0UserDocument, "UserNotFound" | "UnknownError">;

export async function getAuth0User(sub: string): Promise<Auth0UserResult> {
  const fetchedUser = await Auth0UserModel.findOrCreate(sub);

  if (fetchedUser) {
    return { success: true, data: fetchedUser };
  } else {
    return {
      success: false,
      errorType: "UnknownError",
      error: `Unable to fetch data for ${sub}`,
    };
  }
}

export async function updateAuth0User(
  sub: string,
  { colorMode }: Partial<Auth0User>
): Promise<Auth0UserResult> {
  if (!sub) {
    return {
      success: false,
      error: "No user sub provided",
      errorType: "UserNotFound",
    };
  }
  try {
    const result = await Auth0UserModel.findOneAndUpdate(
      { sub },
      { $set: { colorMode } },
      { new: true }
    );

    if (result) {
      return {
        success: true,
        data: result,
      };
    } else {
      const message = `Unable to update ${sub}, record not found`;
      logger.error(message);
      return {
        success: false,
        error: message,
        errorType: "UserNotFound",
      };
    }
  } catch (err) {
    const error = err as Error;
    const message = `Unable to update data for ${sub}: ${error.message}`;

    logger.error(message, error);
    return {
      success: false,
      error: message,
      errorType: "UnknownError",
    };
  }
}
