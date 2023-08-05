import pluralize from "pluralize";
import IFlightPlan from "../interfaces/IFlightPlan.mjs";
import { InitialPhrasingOptions } from "../interfaces/ISIDInformation.mts";
import { ReactNode } from "react";
import { Link } from "@mui/material";

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
    !flightPlan.SIDInformation.Charts?.["skyvector"]
  ) {
    return flightPlan.expandedRoute;
  }

  const strippedRoute = flightPlan.expandedRoute.replace(flightPlan.SIDInformation.Telephony, "");

  return (
    <>
      <Link
        href={flightPlan.SIDInformation.Charts["skyvector"]}
        target="_blank"
        rel="noopener noreferrer"
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
  const initialPhrasing =
    flightPlan.SIDInformation?.InitialPhrasing ||
    flightPlan.departureAirportInfo?.extendedAirportInfo?.initialPhrasing;

  if (initialPhrasing === undefined) {
    return "Unknown";
  }

  if (initialPhrasing === InitialPhrasingOptions.SeeNote) {
    return `See note`;
  }

  if (!flightPlan.initialAltitude || flightPlan.initialAltitude == "Unknown") {
    return "See chart/SOP";
  }

  if (initialPhrasing === InitialPhrasingOptions.Maintain) {
    return `Maintain ${flightPlan.initialAltitude}`;
  }

  if (initialPhrasing === InitialPhrasingOptions.ClimbViaSid) {
    return "Climb via SID";
  }

  if (initialPhrasing === InitialPhrasingOptions.ClimbViaSidExceptMaintain) {
    return `CVS ${flightPlan.initialAltitude}`;
  }

  if (initialPhrasing === InitialPhrasingOptions.ClimbViaDepartureExceptMaintain) {
    return `CVD ${flightPlan.initialAltitude}`;
  }

  return "See chart/SOP";
}

// Looks at the SIDInformation in a flight plan and returns the formatted
// minutes after departure to expect the SID to be assigned.
export function formattedExpectInMinutes(flightPlan: IFlightPlan): string {
  const initialPhrasing =
    flightPlan.SIDInformation?.InitialPhrasing ??
    flightPlan.departureAirportInfo?.extendedAirportInfo?.initialPhrasing;
  const expectRequired =
    flightPlan.SIDInformation?.ExpectRequired ??
    flightPlan.departureAirportInfo?.extendedAirportInfo?.expectRequired;
  const expectInMinutes =
    flightPlan.SIDInformation?.ExpectInMinutes ??
    flightPlan.departureAirportInfo?.extendedAirportInfo?.expectInMinutes;

  if (initialPhrasing === undefined || expectRequired === undefined) {
    return "";
  }

  if (initialPhrasing === InitialPhrasingOptions.SeeNote) {
    return "";
  }

  if (!expectInMinutes) {
    return "See chart/SOP";
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
    airportCodeRegex.test(flightPlan.departure) && // Departure airport is a valid ICAO code
    airportCodeRegex.test(flightPlan.arrival) && // Arrival airport is a valid ICAO code
    flightPlan.route.length > 0 // Route is not empty
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

function cleanRoute(route: string) {
  return route
    .replace(/DCT /g, "") // Get rid of all the DCTs
    .replace(/^\w{3,4}\/\w{2,3}\s*/, "") // Get rid of departure airport/runway making sure to catch the space after it as well
    .replace(/\s*\w{3,4}\/\w{2,3}$/, "") // Get rid of arrival airport/runway making sure to catch the space before it as well
    .replace(/(?<!\/)N\d+F\d+\s*/g, "") // Get rid of step climbs making sure to catch spaces after it so double spaces don't get left behind
    .trim();
}
