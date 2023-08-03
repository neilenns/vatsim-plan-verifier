import { InitialPhrasingOptions } from "./ISIDInformation.mts";

export default interface IExtendedAirportInfo {
  defaultInitialAltitudeText?: string;
  defaultExpectInMinutesText?: string;
  hasSIDs?: boolean;
  initialAltitude?: number;
  initialPhrasing?: InitialPhrasingOptions;
  expectInMinutes?: number;
  expectRequired?: boolean;
}
