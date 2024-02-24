import { atom } from "recoil";
import { IAuth0User } from "../interfaces/IAuth0User.mts";
import { AirportFlow } from "../interfaces/ISIDInformation.mts";

export const flowState = atom({
  key: "flowState",
  default: AirportFlow.Unknown as AirportFlow,
});

export const mutedState = atom({
  key: "mutedState",
  default: false as boolean,
});

export const userInfoState = atom({
  key: "userInfoState",
  default: undefined as IAuth0User | undefined, // Define the type of userInfo object
});
