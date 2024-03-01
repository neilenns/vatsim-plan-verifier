import { Link } from "@mui/material";
import pluralize from "pluralize";
import { ReactNode } from "react";
import IFlightPlan from "../interfaces/IFlightPlan.mjs";
import { AirportFlow, InitialPhrasingOptions } from "../interfaces/ISIDInformation.mts";

export function formatAltitude(altitude: number, includeFeet = true): string {
  if (altitude >= 180) {
    return `FL${altitude}`;
  }

  return `${(altitude * 100).toLocaleString()}${includeFeet ? " feet" : ""}`;
}

// Checks to see if the airport name ends in "Airport". If so, return
// unmodified. If not, append " Airport" and return it.
export function normalizeAirportName(airportName: string): string {
  if (airportName.endsWith("Airport")) {
    return airportName;
  } else {
    return `${airportName} Airport`;
  }
}

export function hyperlinkSidName(flightPlan: IFlightPlan): ReactNode {
  // Lots of things have to exist to bother hyperlinking the chart
  if (
    !flightPlan.SIDInformation ||
    !flightPlan.expandedRoute ||
    !flightPlan.SIDInformation.Telephony ||
    !flightPlan.SIDInformation.Charts?.skyvector
  ) {
    return flightPlan.expandedRoute;
  }

  const strippedRoute = flightPlan.expandedRoute.replace(flightPlan.SIDInformation.Telephony, "");

  return (
    <>
      <Link
        href={flightPlan.SIDInformation.Charts.skyvector}
        target="_blank"
        rel="noopener noreferrer"
        underline="hover"
      >
        {flightPlan.SIDInformation.Telephony}
      </Link>{" "}
      {strippedRoute}
    </>
  );
}

// Formats the initial altitude for the flight plan based on whether one is
// provided and whether the SID requires "climb via SID" phraseology.
export function formattedInitialAltitude(flightPlan: IFlightPlan): string {
  if (flightPlan.flow === AirportFlow.Unknown) {
    return "Set flow";
  }

  if (!flightPlan.initialAltitudeInfo) {
    return "Unknown";
  }

  const initialPhrasing = flightPlan.initialAltitudeInfo.InitialPhrasing;
  const initialAltitude = flightPlan.initialAltitudeInfo.Altitude;

  if (initialPhrasing === InitialPhrasingOptions.SeeNote) {
    return `See note`;
  }

  if (initialPhrasing === InitialPhrasingOptions.Maintain) {
    return `Maintain ${formatAltitude(initialAltitude, false)}`;
  }

  if (initialPhrasing === InitialPhrasingOptions.ClimbViaSid) {
    return "Climb via SID";
  }

  if (initialPhrasing === InitialPhrasingOptions.ClimbViaSidExceptMaintain) {
    return `CVS ${formatAltitude(initialAltitude, false)}`;
  }

  if (initialPhrasing === InitialPhrasingOptions.ClimbViaDepartureExceptMaintain) {
    return `CVD ${formatAltitude(initialAltitude, false)}`;
  }

  return "See chart/SOP";
}

// Looks at the SIDInformation in a flight plan and returns the formatted
// minutes after departure to expect the SID to be assigned.
export function formattedExpectIn(flightPlan: IFlightPlan): string {
  if (flightPlan.flow === AirportFlow.Unknown || !flightPlan.initialAltitudeInfo) {
    return "";
  }

  const initialPhrasing = flightPlan.initialAltitudeInfo.InitialPhrasing;
  const expectRequired = flightPlan.initialAltitudeInfo.ExpectRequired;
  const expectInMinutes = flightPlan.initialAltitudeInfo.ExpectInMinutes;
  const expectInMiles = flightPlan.initialAltitudeInfo.ExpectInMiles;

  if (expectRequired === undefined) {
    return "";
  }

  if (initialPhrasing === InitialPhrasingOptions.SeeNote) {
    return "";
  }

  if (!expectInMinutes && !expectInMiles) {
    return "See chart/SOP";
  }

  // expectInMiles takes priority if both are specified, although that should
  // never happen
  if (expectInMiles) {
    return expectRequired ? expectInMiles : `(${expectInMiles})`;
  }

  // If the expect in minutes is required because it isn't printed on the chart
  // then show it directly. If it is only required when modifying the cruise altitude
  // show it inside ().
  const formattedString = expectRequired
    ? pluralize("minute", expectInMinutes, true)
    : `(${pluralize("minute", expectInMinutes, true)})`;

  return formattedString;
}

// Cleans up flight plans that have two squawk codes in them by removing
// the second one, which is the one the plane is currently squawking.
// Unfortunately VRC will collapse the two codes down to one in the displayed
// flight plan if the plane is switched to the correct code, so we have to
// normalize the flight plan before parsing it.
function removeSecondSquawkCode(flightPlan: string): string {
  const regex = /\b\d{4}\s+\d{4}\b/;
  const match = flightPlan.match(regex);

  if (match) {
    // Extract the first four-digit number
    const firstFourDigitNumber = match[0].split(" ")[0];

    // Replace the entire matched pattern with just the first four-digit number
    return flightPlan.replace(regex, firstFourDigitNumber);
  }

  return flightPlan; // If no match found, return the input as is
}

// Does a sanity check on the flight plan values to see if it is plausibly valid after
// parsing.
export function validateFlightPlan(flightPlan: IFlightPlan): boolean {
  const airportCodeRegex = /^[a-zA-Z]{3,4}$/;

  return (
    !Number.isNaN(Number(flightPlan.squawk)) && // Callsign is a number
    !Number.isNaN(Number(flightPlan.cruiseAltitude)) && // Cruise altitude is a number
    airportCodeRegex.test(flightPlan.departure ?? "") && // Departure airport is a valid ICAO code
    airportCodeRegex.test(flightPlan.arrival ?? "") && // Arrival airport is a valid ICAO code
    (flightPlan.route?.length ?? 0) > 0 // Route is not empty
  );
}

export function parseFlightPlan(rawFlightPlan: string): IFlightPlan {
  rawFlightPlan = removeSecondSquawkCode(rawFlightPlan);

  const [callsign, rawAircraftType, assignedSquawk, departure, arrival, cruiseAltitude, ...route] =
    rawFlightPlan
      .replace(/-/g, "") // Remove the dash between the departure and arrival airports
      .replace(/\s+/g, " ") // Remove the extra spaces inserted by VRC between each field
      .replace(/\n/g, " ") // Convert the newlines inserted by VRC to a single space
      .split(" ");

  const flightPlan: IFlightPlan = {
    callsign,
    rawAircraftType,
    squawk: assignedSquawk,
    departure,
    arrival,
    cruiseAltitude,
    route: cleanRoute(route.join(" ")),
  };

  return flightPlan;
}

export function cleanRoute(route: string) {
  return route
    .replace(/DCT /g, "") // Get rid of all the DCTs
    .replace(/^\w{3,4}\/\w{2,3}\s*/, "") // Get rid of departure airport/runway making sure to catch the space after it as well
    .replace(/\s*\w{3,4}\/\w{2,3}$/, "") // Get rid of arrival airport/runway making sure to catch the space before it as well
    .replace(/(?<!\/)N\d+F\d+\s*/g, "") // Get rid of step climbs making sure to catch spaces after it so double spaces don't get left behind
    .trim() // Strip leading and trailing whitespace
    .replace(/\s+/g, " "); // Issue 601: Get rid of any multiple spaces between route parts
}
