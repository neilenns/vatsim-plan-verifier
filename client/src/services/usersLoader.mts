import { LoaderFunction } from "react-router-dom";
import { getUsers } from "./users.mjs";

export const usersLoader: LoaderFunction = async () => {
  try {
    const users = await getUsers();

    return users;
  } catch {
    return [];
  }
};
