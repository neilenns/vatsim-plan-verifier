import { IUser } from "../interfaces/IUser.mts";
import http from "../utils/http.mts";

export async function getUsers(): Promise<IUser[] | undefined> {
  try {
    // Send GET request to the Express.js route using Axios
    const response = await http.get(`users`, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
      },
    });

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
    // Send PUT request to the Express.js route using Axios
    const response = await http.put(`users`, user, {
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
      },
    });

    if (response.status === 200) {
      return response.data as IUser;
    } else {
      throw new Error("Failed to update users");
    }
  } catch (error) {
    throw new Error("Failed to update users");
  }
}
