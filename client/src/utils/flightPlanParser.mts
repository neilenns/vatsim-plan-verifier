import IFlightPlan from "../interfaces/IFlightPlan.mjs";

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

  // Do some pre-cleanup on the route so it looks good on the website as well as when sent for verification
  const cleanRoute = route
    .join(" ") // Put the route back together
    .replace(/DCT /g, "") // Get rid of all the DCTs
    .replace(/^\w{3,4}\/\w{2,3}\s*/, "") // Get rid of departure airport/runway making sure to catch the space after it as well
    .replace(/\s*\w{3,4}\/\w{2,3}$/, "") // Get rid of arrival airport/runway making sure to catch the space before it as well
    .replace(/(?<!\/)N\d+F\d+\s*/g, "") // Get rid of step climbs making sure to catch spaces after it so double spaces don't get left behind
    .trim(); // Just to be sure...

  const flightPlan: IFlightPlan = {
    callsign,
    rawAircraftType,
    squawk: assignedSquawk,
    departure,
    arrival,
    cruiseAltitude,
    route: cleanRoute,
  };

  return flightPlan;
}