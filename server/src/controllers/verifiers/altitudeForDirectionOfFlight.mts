import { FlightPlan } from "../../models/FlightPlan.mjs";
import VerifierResult from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";
import { formatAltitude } from "../../utils.mjs";
import debug from "debug";

const verifierName = "altitudeForDirectionOfFlight";
const logger = debug(`plan-verifier:${verifierName}`);

const eastboundRVSMAltitudes: number[] = [450, 490, 530, 570];
const westboundRVSMAltiudes: number[] = [430, 470, 510, 550, 590];

export default async function altitudeForDirectionOfFlight({
  _id,
  directionOfFlight,
  cruiseAltitude,
  cruiseAltitudeFormatted,
  departure,
  arrival,
}: FlightPlan): Promise<VerifierControllerResult> {
  // Set up the default result for a successful run of the verifier.
  let result: VerifierControllerResult = {
    success: true,
    data: new VerifierResult({
      flightPlanId: _id,
      verifier: verifierName,
      flightPlanPart: "cruiseAltitude",
      priority: 5,
    }),
  };

  try {
    // If the direction of flight wasn't calculated then bail early.
    if (!directionOfFlight) {
      result.data.status = "Warning";
      result.data.messageId = "directionOfFlightNotCalculated";
      result.data.message = `Direction of flight wasn't calculated between ${departure} and ${arrival}.`;
    }
    // KPDX to KSLE has special rules handled in checkKPDXtoKSLEAltitude
    else if (departure === "KPDX" && arrival === "KSLE") {
      result.data.status = "Information";
      result.data.message = `This verifier is not applicable to flights from KPDX to KSLE.`;
      result.data.messageId = "KPDXtoKSLE";
    }
    // Since the direction of flight is available it can be tested against the cruise altitude.
    else {
      // This is used in the result messages to ensure the heading is always 3 digits.
      const paddedDirectionOfFlight = directionOfFlight.toString().padStart(3, "0");

      // Set up the success case now since the if statements for the failure are a nightmare.
      result.data.status = "Information";
      result.data.messageId = "altitudeValidForDirectionOfFlight";
      result.data.message = `Cruise altitude ${cruiseAltitudeFormatted} is valid for the direction of flight (${paddedDirectionOfFlight}).`;

      // Check altitudes that are separated by 1000' first. This is anything that's in RVSM airspace or below.
      if (cruiseAltitude <= 410) {
        // If the direction is eastbound then it has to be an odd altitude
        if (directionOfFlight <= 179 && (cruiseAltitude / 10) % 2 === 0) {
          result.data.status = "Error";
          result.data.messageId = "altitudeInvalidForEastboundDirectionOfFlight";
          result.data.message = `Direction of flight is eastbound (${paddedDirectionOfFlight}) but ${cruiseAltitudeFormatted} is even. Offer ${formatAltitude(
            cruiseAltitude - 10
          )} or ${formatAltitude(cruiseAltitude + 10)}.`;
          result.data.priority = 1;
        }
        // If the direction of flight is westbound then it has to be an even altitude.
        else if (directionOfFlight >= 180 && (cruiseAltitude / 10) % 2 !== 0) {
          result.data.status = "Error";
          result.data.messageId = "altitudeInvalidForWestboundDirectionOfFlight";
          result.data.message = `Direction of flight is westbound (${paddedDirectionOfFlight}) but ${cruiseAltitudeFormatted} is odd. Offer ${formatAltitude(
            cruiseAltitude - 10
          )} or ${formatAltitude(cruiseAltitude + 10)}.`;
          result.data.priority = 1;
        }
      }
      // Check altitudes that are separated by 2000' next. This is anything that's above RVSM airspace.
      else {
        // If the direction of flight is eastbound then it has to be one of the eastbound RVSM altitudes.
        if (directionOfFlight <= 179 && !eastboundRVSMAltitudes.includes(cruiseAltitude)) {
          result.data.status = "Error";
          result.data.messageId = "altitudeInvalidForEastboundAboveRVSMDirectionOfFlight";
          result.data.message = `Direction of flight is eastbound (${paddedDirectionOfFlight}) but ${cruiseAltitudeFormatted} is not one of the eastbound RVSM altitudes. Offer ${eastboundRVSMAltitudes
            .map((altitude) => formatAltitude(altitude))
            .joinWithWord("or")}.`;
          result.data.priority = 1;
        }
        // If the direction of flight is westbound then it has to be one of the westbound RVSM altitudes.
        else if (directionOfFlight >= 180 && !westboundRVSMAltiudes.includes(cruiseAltitude)) {
          result.data.status = "Error";
          result.data.messageId = "altitudeInvalidForWestboundAboveRVSMDirectionOfFlight";
          result.data.message = `Direction of flight is westbound (${paddedDirectionOfFlight}) but ${cruiseAltitudeFormatted} is not one of the westbound RVSM altitudes. Offer ${westboundRVSMAltiudes
            .map((altitude) => formatAltitude(altitude))
            .joinWithWord("or")}.`;
          result.data.priority = 1;
        }
      }
    }

    await result.data.save();
  } catch (error) {
    logger(`Error running ${verifierName}: ${error}`);

    result = {
      success: false,
      errorType: "UnknownError",
      error: `Error running ${verifierName}: ${error}`,
    };
  }

  return result;
}
