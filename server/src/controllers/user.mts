import mainLogger from "../logger.mjs";
import { Auth0UserDocument, Auth0UserModel } from "../models/Auth0User.mjs";
import Result from "../types/result.mjs";

type Auth0UserResult = Result<Auth0UserDocument, "UnknownError">;

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
