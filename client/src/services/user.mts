import { IAuth0User } from "../interfaces/IAuth0User.mts";
import http from "../utils/http.mts";

export async function getUserInfo(
  authToken: string,
  sub?: string
): Promise<IAuth0User | undefined> {
  if (!sub) {
    return;
  }

  http.authorized(authToken);
  const response = await http.get(`users/me`);

  if (response.status === 200) {
    return response.data as IAuth0User;
  } else if (response.status === 401) {
    throw new Error(`Unauthorized`);
  } else {
    throw new Error(response.statusText);
  }
}
