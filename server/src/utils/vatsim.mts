import mainLogger from "../logger.mjs";
import { VatsimCommunicationMethod } from "../models/VatsimFlightPlan.mjs";

const logger = mainLogger.child({ service: "utils" });

export function cleanRoute(route: string): string {
  return route
    .replace(/\s\+/g, "") // Get rid of " +", the indicator of the end of a reroute
    .replace(/DCT /g, "") // Get rid of all the DCTs
    .replace(/^\w{3,4}\/\w{2,3}\s*/, "") // Get rid of departure airport/runway making sure to catch the space after it as well
    .replace(/\s*\w{3,4}\/\w{2,3}$/, "") // Get rid of arrival airport/runway making sure to catch the space before it as well
    .replace(/(?<!\/)N\d+F\d+\s*/g, "") // Get rid of step climbs making sure to catch spaces after it so double spaces don't get left behind
    .trim() // Trim leading and trailing whitespace
    .replace(/\s+/g, " "); // Issue 601: Get rid of any multiple spaces between route parts
}

export function depTimeToDateTime(depTime: string | undefined): Date | undefined {
  if (depTime == null) {
    return undefined;
  }

  try {
    const departureTime = new Date();
    const hour = parseInt(depTime.substring(0, 2));
    const minute = parseInt(depTime.substring(2, 4));

    departureTime.setUTCHours(hour);
    departureTime.setUTCMinutes(minute);

    // Set seconds and millseconds to zero otherwise every time this
    // runs the time is different and it causes a database save
    departureTime.setUTCSeconds(0);
    departureTime.setUTCMilliseconds(0);

    return departureTime;
  } catch (err) {
    const error = err as Error;

    logger.error(`Unable to parse ${depTime} to a time: ${error.message}`, error);

    return undefined;
  }
}

export function getCommunicationMethod(inputString: string | undefined): VatsimCommunicationMethod {
  if (inputString?.includes("/T/") ?? false) {
    return VatsimCommunicationMethod.TEXTONLY;
  } else if (inputString?.includes("/R/") ?? false) {
    return VatsimCommunicationMethod.RECEIVE;
  } else if (inputString?.includes("/V/") ?? false) {
    return VatsimCommunicationMethod.VOICE;
  } else {
    return VatsimCommunicationMethod.VOICE;
  }
}
