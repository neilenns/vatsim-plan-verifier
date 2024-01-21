import mainLogger from "../logger.mjs";
import UserModel, { IUser } from "../models/User.mjs";
import Result from "../types/result.mjs";

const logger = mainLogger.child({ service: "user" });

type UsersResult = Result<IUser[], "UnknownError">;
type UserResult = Result<IUser, "UnknownError">;

export async function getUser(id: string): Promise<UserResult> {
  try {
    const fetchedUser = await UserModel.findById(id);

    if (fetchedUser) {
      return { success: true, data: fetchedUser };
    } else {
      return {
        success: false,
        errorType: "UnknownError",
        error: `Unable to fetch user ${id}.`,
      };
    }
  } catch (error) {
    logger.error(`Error fetching user ${id}: ${error}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error fetching user ${id}: ${error}`,
    };
  }
}

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
    logger.error(`Error fetching users: ${error}`);

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
    logger.error(`Error updating user: ${error}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error updating user: ${error}`,
    };
  }
}
