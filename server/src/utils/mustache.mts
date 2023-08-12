import Mustache from "mustache";
import { FlightPlan } from "../models/FlightPlan.mjs";
import { NavaidModel } from "../models/Navaid.mjs";
import { isDocument } from "@typegoose/typegoose";

function normalizeAirportName(airportName: string) {
  if (airportName.endsWith("Airport")) {
    return airportName;
  } else {
    return `${airportName} Airport`;
  }
}

export default async function applyMustacheValues(
  template: string,
  flightPlan: FlightPlan
): Promise<string> {
  const initialFix = await NavaidModel.findOne({ ident: flightPlan.routeParts?.[1] ?? "" });

  const view = {
    formattedCruiseAltitude: flightPlan.cruiseAltitudeFormatted.replace(" feet", ""),
    arrival: isDocument(flightPlan.arrivalAirportInfo)
      ? flightPlan.arrivalAirportInfo?.name
        ? normalizeAirportName(flightPlan.arrivalAirportInfo.name)
        : flightPlan.arrival
      : flightPlan.arrival,
    squawk: flightPlan.squawk,
    initialFix: initialFix?.name ?? flightPlan.routeParts?.[1] ?? "unknown",
  };

  const result = Mustache.render(template, view);
  return result;
}
