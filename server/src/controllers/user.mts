import UserModel, { IUser } from "../models/User.mjs";
import Result from "../types/result.mjs";
import debug from "debug";

const logger = debug("plan-verifier:navaidController");
type UsersResult = Result<IUser[], "UnknownError">;

export async function getUsers(): Promise<UsersResult> {
  try {
    const fetchedUsers = await UserModel.find({});

    if (fetchedUsers) {
      return { success: true, data: fetchedUsers };
    } else {
      return {
        success: false,
        errorType: "UnknownError",
        error: `Unable to fetch users.`,
      };
    }
  } catch (error) {
    logger(`Error fetching users: ${error}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching users: ${error}`,
    };
  }
}
