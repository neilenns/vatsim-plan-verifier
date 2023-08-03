import Mustache from "mustache";
import { IFlightPlan } from "../models/FlightPlan.mjs";
import NavaidModel from "../models/Navaid.mjs";

function normalizeAirportName(airportName: string) {
  if (airportName.endsWith("Airport")) {
    return airportName;
  } else {
    return `${airportName} Airport`;
  }
}

export default async function applyMustacheValues(
  template: string,
  flightPlan: IFlightPlan
): Promise<string> {
  const initialFix = await NavaidModel.findOne({ ident: flightPlan.routeParts?.[1] ?? "" });

  const view = {
    formattedCruiseAltitude: flightPlan.cruiseAltitudeFormatted,
    arrival: flightPlan.arrivalAirportInfo?.name
      ? normalizeAirportName(flightPlan.arrivalAirportInfo.name)
      : flightPlan.arrival,
    squawk: flightPlan.squawk,
    initialFix: initialFix?.name ?? flightPlan.routeParts?.[1] ?? "unknown",
  };

  const result = Mustache.render(template, view);
  return result;
}
