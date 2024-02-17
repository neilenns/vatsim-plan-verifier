import { IAuth0User } from "../interfaces/IAuth0User.mts";
import http from "../utils/http.mts";

export async function getUserInfo(token: string, sub?: string): Promise<IAuth0User | undefined> {
  if (!sub) {
    return;
  }

  const response = await http.authorized(token).get(`users/me`);

  if (response.status === 200) {
    return response.data as IAuth0User;
  } else if (response.status === 401) {
    throw new Error(`Unauthorized`);
  } else {
    throw new Error(response.statusText);
  }
}

export async function putUserInfo(
  token: string,
  userInfo: IAuth0User
): Promise<IAuth0User | undefined> {
  if (!userInfo.sub) {
    return;
  }

  const response = await http.authorized(token).put(`users/me`, userInfo);

  if (response.status === 200) {
    return response.data as IAuth0User;
  } else if (response.status === 401) {
    throw new Error(`Unauthorized`);
  } else {
    throw new Error(response.statusText);
  }
}
