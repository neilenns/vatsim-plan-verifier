import { isDocument } from "@typegoose/typegoose";
import Mustache from "mustache";
import { type FlightPlan } from "../models/FlightPlan.mjs";
import { NavaidModel } from "../models/Navaid.mjs";

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
  const initialFix = await NavaidModel.findOne({
    ident: flightPlan.routeParts?.[1] ?? "",
  }).cacheQuery({ ttl: 60 * 60 });

  const equipmentInfo = isDocument(flightPlan.equipmentInfo) ? flightPlan.equipmentInfo : null;

  const view = {
    formattedCruiseAltitude: flightPlan.cruiseAltitudeFormatted.replace(" feet", ""),
    arrival: isDocument(flightPlan.arrivalAirportInfo)
      ? flightPlan.arrivalAirportInfo?.name
        ? normalizeAirportName(flightPlan.arrivalAirportInfo.name)
        : flightPlan.arrival
      : flightPlan.arrival,
    squawk: flightPlan.squawk,
    equipmentCode: flightPlan.equipmentCode,
    wingspan: equipmentInfo?.wingspan ?? 0,
    tailHeight: equipmentInfo?.tailHeight ?? 0,
    airplaneDesignGroup: equipmentInfo?.airplaneDesignGroup ?? 0,
    initialFix: initialFix?.name ?? flightPlan.routeParts?.[1] ?? "unknown",
  };

  const result = Mustache.render(template, view);
  return result;
}
