import { MongoBulkWriteError } from "mongodb";
import { CustomLevelsLogger } from "./logger.mjs";

export function logMongoBulkErrors(logger: CustomLevelsLogger, err: unknown) {
  const error = err as Error;

  // Bulk write errors are super annoying. The actual write errors
  // are a OneOrMore<T> which means you have to check and see if it's an
  // array to know how to write out the error messages.
  // instanceOf MongoBulkWriteError doesn't work either for some reason,
  // you have to check by the error.name property intsead.
  if (error.name === "MongoBulkWriteError") {
    const writeErrors = (err as MongoBulkWriteError).writeErrors;

    if (Array.isArray(writeErrors)) {
      writeErrors.forEach((writeError) => {
        logger.error(writeError.errmsg);
      });
    } else {
      logger.error(writeErrors);
    }
  } else {
    logger.error(`Unable to save to database: ${error.message}.`);
  }
}

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
// a string in thousands (e.g. "34000").
// Note that this just does string manipulation. It does not
// convert the string to a number.
export function convertFLtoThousands(value: string) {
  if (value.startsWith("FL")) {
    return `${value.replace("FL", "")}00`;
  } else {
    return value;
  }
}
