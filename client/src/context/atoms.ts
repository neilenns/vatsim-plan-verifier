import { atom } from "recoil";
import { IAuth0User } from "../interfaces/IAuth0User.mts";
import { AirportFlow } from "../interfaces/ISIDInformation.mts";

export const sortByCreatedAtState = atom({
  key: "sortByCreatedAtState",
  default: false,
});

export const autoHideImportedState = atom({
  key: "autoHideImportedState",
  default: false,
});

export const hideInformationalState = atom({
  key: "hideInformationalState",
  default: true,
});

export const streamingModeState = atom({
  key: "streamingModeState",
  default: false,
});

export const flowState = atom({
  key: "flowState",
  default: AirportFlow.Unknown,
});

export const mutedState = atom({
  key: "mutedState",
  default: false,
});

export const userInfoState = atom({
  key: "userInfoState",
  default: undefined as IAuth0User | undefined, // Define the type of userInfo object
});
