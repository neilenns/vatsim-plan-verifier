import IFlightPlan from "../interfaces/IFlightPlan.mts";

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

export default function parseFlightPlan(rawFlightPlan: string) {
  rawFlightPlan = removeSecondSquawkCode(rawFlightPlan);

  const [
    callsign,
    aircraftType,
    assignedSquawk,
    departure,
    arrival,
    cruiseAltitude,
    ...route
  ] = rawFlightPlan
    .replace(/-/g, "") // Remove the dash between the departure and arrival airports
    .replace(/\s+/g, " ") // Remove the extra spaces inserted by VRC between each field
    .replace(/\n/g, " ") // Convert the newlines inserted by VRC to a single space
    .split(" ");

  const flightPlan = {
    callsign,
    aircraftType,
    squawk: assignedSquawk,
    departure,
    arrival,
    cruiseAltitude,
    route: route.join(" "),
  } as IFlightPlan;

  return flightPlan;
}
