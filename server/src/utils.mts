import { log } from "console";
import debug from "debug";

const logger = debug("plan-verifier:utils");

export function formatAltitude(altitude: number, includeFeet: boolean = true): string {
  if (altitude >= 180) {
    return `FL${altitude}`;
  }

  return `${(altitude * 100).toLocaleString()}${includeFeet ? " feet" : ""}`;
}

// Takes a string and converts it to a number. If the conversion
// fails it returns 0.
export function parseStringToNumber(value: string) {
  if (!value || value.length === 0) {
    return 0;
  }

  const convertedValue = Number(value);
  if (isNaN(convertedValue)) {
    return 0;
  }
  return convertedValue;
}

// Takes a flight level (e.g. "FL340") and converts it to
// a string in thousands (e.g. "34000"). Note that this just
// does string manipulation. It does not convert the string
// to a number.
export function convertFLtoThousands(value: string) {
  if (value?.startsWith("FL")) {
    value = `${value.replace("FL", "")}00`;
  }

  return value;
}
