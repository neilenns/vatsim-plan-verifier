import { atom } from "recoil";
import { IAuth0User } from "../interfaces/IAuth0User.mts";

export const mutedState = atom({
  key: "mutedState",
  default: false as boolean,
});
export const userInfoState = atom({
  key: "userInfoState",
  default: undefined as IAuth0User | undefined, // Define the type of userInfo object
});
