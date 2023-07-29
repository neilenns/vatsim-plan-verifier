import UserModel, { IUser } from "../models/User.mjs";
import Result from "../types/result.mjs";
import debug from "debug";

const logger = debug("plan-verifier:navaidController");
type UsersResult = Result<IUser[], "UnknownError">;
type UserResult = Result<IUser, "UnknownError">;

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

export async function updateUser(user: IUser): Promise<UserResult> {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(user._id, user, { new: true });

    if (updatedUser) {
      return { success: true, data: updatedUser };
    } else {
      return {
        success: false,
        errorType: "UnknownError",
        error: `Unable to update user.`,
      };
    }
  } catch (error) {
    logger(`Error updating user: ${error}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error updating user: ${error}`,
    };
  }
}
