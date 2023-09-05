import { log } from "console";
import debug from "debug";

const logger = debug("plan-verifier:utils");

const trackedAirports = ["KPDX", "KSEA"];

function logIfTrackedAirport(message: string, airport: string) {
  if (!trackedAirports.includes(airport)) return;

  logger(message);
}

export function formatAltitude(altitude: number, includeFeet: boolean = true): string {
  if (altitude >= 180) {
    return `FL${altitude}`;
  }

  return `${(altitude * 100).toLocaleString()}${includeFeet ? " feet" : ""}`;
}

// Takes a string and converts it to a number. If the conversion
// fails it returns 0.
export function parseStringToNumber(value: string, airport: string) {
  logIfTrackedAirport(`Converting ${value} to a number`, airport);
  if (!value || value.length === 0) {
    logIfTrackedAirport(`Value was either null or zero length, returning 0`, airport);
    return 0;
  }

  const convertedValue = Number(value);
  if (isNaN(convertedValue)) {
    logger(`Unable to convert ${value} to a number`);
    return 0;
  }
  logIfTrackedAirport(`Returning ${convertedValue} as the number version of ${value}`, airport);
  return convertedValue;
}

// Takes a flight level (e.g. "FL340") and converts it to
// a string in thousands (e.g. "34000"). Note that this just
// does string manipulation. It does not convert the string
// to a number.
export function convertFLtoThousands(value: string, airport: string) {
  logIfTrackedAirport(`Converting ${value} from FL to thousands`, airport);

  if (value?.startsWith("FL")) {
    logIfTrackedAirport(`Replacing FL with nothing`, airport);
    value = `${value.replace("FL", "")}00`;
    logIfTrackedAirport(`Returning ${value}`, airport);
  }

  logIfTrackedAirport(`Didn't need to convert from FL, returning ${value}`, airport);
  return value;
}
