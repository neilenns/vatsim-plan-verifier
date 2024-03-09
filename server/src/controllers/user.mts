import mainLogger from "../logger.mjs";
import { type Auth0User, type Auth0UserDocument, Auth0UserModel } from "../models/Auth0User.mjs";
import type Result from "../types/result.mjs";

const logger = mainLogger.child({ service: "user" });

type Auth0UserResult = Result<Auth0UserDocument, "UserNotFound" | "UnknownError">;

export async function getAuth0User(sub: string): Promise<Auth0UserResult> {
  const fetchedUser = await Auth0UserModel.findOrCreate(sub);

  if (fetchedUser != null) {
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
  { colorMode, autoHideImported, hideInformational, streamingMode }: Partial<Auth0User>
): Promise<Auth0UserResult> {
  if (sub.length === 0) {
    return {
      success: false,
      error: "No user sub provided",
      errorType: "UserNotFound",
    };
  }
  try {
    const result = await Auth0UserModel.findOneAndUpdate(
      { sub },
      { $set: { colorMode, autoHideImported, hideInformational, streamingMode } },
      { new: true }
    );

    if (result != null) {
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
