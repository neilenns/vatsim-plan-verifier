import { DateTime } from "luxon";
import { VatsimCommunicationMethod } from "../models/VatsimFlightPlan.mjs";

export function cleanRoute(route: string) {
  return route
    .replace(/DCT /g, "") // Get rid of all the DCTs
    .replace(/^\w{3,4}\/\w{2,3}\s*/, "") // Get rid of departure airport/runway making sure to catch the space after it as well
    .replace(/\s*\w{3,4}\/\w{2,3}$/, "") // Get rid of arrival airport/runway making sure to catch the space before it as well
    .replace(/(?<!\/)N\d+F\d+\s*/g, "") // Get rid of step climbs making sure to catch spaces after it so double spaces don't get left behind
    .trim() // Trim leading and trailing whitespace
    .replace(/\s+/g, " "); // Issue 601: Get rid of any multiple spaces between route parts
}

export function depTimeToDateTime(depTime: string | undefined): Date | undefined {
  const result = depTime ? DateTime.fromFormat(depTime, "Hmm", { zone: "UTC" }) : undefined;

  // Issue #943: Super important to check that the fromFormat was successful, otherwise the string "Invalid date"
  // winds up trying to get set on the typegoose Date-typed property and fails, which causes the entire processing
  // of the data to fail.
  return result?.isValid ? result.toJSDate() : undefined;
}

export function getCommunicationMethod(inputString: string | undefined): VatsimCommunicationMethod {
  if (inputString?.includes("/T/")) {
    return VatsimCommunicationMethod.TEXTONLY;
  } else if (inputString?.includes("/R/")) {
    return VatsimCommunicationMethod.RECEIVE;
  } else if (inputString?.includes("/V/")) {
    return VatsimCommunicationMethod.VOICE;
  } else {
    return VatsimCommunicationMethod.VOICE;
  }
}
