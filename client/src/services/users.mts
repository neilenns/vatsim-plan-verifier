import { IUser } from "../interfaces/IUser.mts";
import http from "../utils/http.mts";

export async function getUser(): Promise<IUser | undefined> {
  try {
    const response = await http.get(`users/me`);

    if (response.status === 200) {
      return response.data as IUser;
    } else {
      throw new Error("Failed to get user");
    }
  } catch (error) {
    throw new Error("Failed to get user");
  }
}

export async function getUsers(): Promise<IUser[] | undefined> {
  try {
    const response = await http.get(`users`);

    if (response.status === 200) {
      return response.data as IUser[];
    } else {
      throw new Error("Failed to get users");
    }
  } catch (error) {
    throw new Error("Failed to get users");
  }
}

export async function updateUser(user: IUser): Promise<IUser | undefined> {
  try {
    const response = await http.put(`users`, user);

    if (response.status === 200) {
      return response.data as IUser;
    } else {
      throw new Error("Failed to update users");
    }
  } catch (error) {
    throw new Error("Failed to update users");
  }
}
