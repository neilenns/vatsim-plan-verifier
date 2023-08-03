import Mustache from "mustache";
import { IFlightPlan } from "../models/FlightPlan.mjs";

function normalizeAirportName(airportName: string) {
  if (airportName.endsWith("Airport")) {
    return airportName;
  } else {
    return `${airportName} Airport`;
  }
}

export default function applyMustacheValues(template: string, flightPlan: IFlightPlan): string {
  const view = {
    formattedCruiseAltitude: flightPlan.cruiseAltitudeFormatted,
    arrival: flightPlan.arrivalAirportInfo?.name
      ? normalizeAirportName(flightPlan.arrivalAirportInfo.name)
      : flightPlan.arrival,
    squawk: flightPlan.squawk,
  };

  const result = Mustache.render(template, view);
  return result;
}
