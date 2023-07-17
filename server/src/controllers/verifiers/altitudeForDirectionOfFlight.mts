import { IFlightPlan } from "../../models/FlightPlan.mjs";
import VerifierResult, {
  IVerifierResult,
} from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";
import { formatAltitude } from "../../utils.mjs";

const verifierName = "altitudeForDirectionOfFlight";

const eastboundRVSMAltitudes: number[] = [450, 490, 530, 570];
const westboundRVSMAltiudes: number[] = [430, 470, 510, 550, 590];

export async function altitudeForDirectionOfFlight(
  flightPlan: IFlightPlan
): Promise<VerifierControllerResult> {
  try {
    const { directionOfFlight, cruiseAltitude, cruiseAltitudeFormatted } =
      flightPlan;

    // If the direction of flight wasn't calculated then bail early.
    if (!directionOfFlight) {
      const dbEntry: IVerifierResult = new VerifierResult({
        flightPlanId: flightPlan._id,
        status: "Warning",
        verifier: verifierName,
        message: `Direction of flight wasn't calculated between ${flightPlan.departure} and ${flightPlan.arrival}.`,
        flightPlanPart: "cruiseAltitude",
        priority: 5,
      });

      await dbEntry.save();

      return {
        success: true,
        data: dbEntry,
      };
    }

    const paddedDirectionOfFlight = directionOfFlight
      .toString()
      .padStart(3, "0");

    var dbEntry: IVerifierResult = new VerifierResult({
      flightPlanId: flightPlan._id,
      status: "Information",
      verifier: verifierName,
      message: `Cruise altitude ${cruiseAltitudeFormatted} is valid for the direction of flight (${paddedDirectionOfFlight}).`,
      flightPlanPart: "cruiseAltitude",
      priority: 5,
    });

    if (cruiseAltitude <= 410) {
      if (directionOfFlight <= 179 && (cruiseAltitude / 10) % 2 === 0) {
        dbEntry = new VerifierResult({
          flightPlanId: flightPlan._id,
          status: "Error",
          verifier: verifierName,
          message: `Direction of flight is eastbound (${paddedDirectionOfFlight}) but ${cruiseAltitudeFormatted} is even. Offer ${formatAltitude(
            cruiseAltitude - 10
          )} or ${formatAltitude(cruiseAltitude + 10)}.`,
          flightPlanPart: "cruiseAltitude",
          priority: 1,
        });
      } else if (directionOfFlight >= 180 && (cruiseAltitude / 10) % 2 !== 0) {
        dbEntry = new VerifierResult({
          flightPlanId: flightPlan._id,
          status: "Error",
          verifier: verifierName,
          message: `Direction of flight is westbound (${paddedDirectionOfFlight}) but ${cruiseAltitudeFormatted} is odd. Offer ${formatAltitude(
            cruiseAltitude - 10
          )} or ${formatAltitude(cruiseAltitude + 10)}.`,
          flightPlanPart: "cruiseAltitude",
          priority: 1,
        });
      }
    } else {
      if (
        directionOfFlight <= 179 &&
        !eastboundRVSMAltitudes.includes(cruiseAltitude)
      ) {
        dbEntry = new VerifierResult({
          flightPlanId: flightPlan._id,
          status: "Error",
          verifier: verifierName,
          message: `Direction of flight is eastbound (${paddedDirectionOfFlight}) but ${
            flightPlan.cruiseAltitudeFormatted
          } is above FL410 and should be one of ${eastboundRVSMAltitudes
            .map((altitude) => `FL${altitude}`)
            .join(", ")}.`,
          flightPlanPart: "cruiseAltitude",
          priority: 1,
        });
      } else if (
        directionOfFlight >= 180 &&
        !westboundRVSMAltiudes.includes(cruiseAltitude)
      ) {
        dbEntry = new VerifierResult({
          flightPlanId: flightPlan._id,
          status: "Error",
          verifier: verifierName,
          message: `Direction of flight is westbound (${paddedDirectionOfFlight}) but ${
            flightPlan.cruiseAltitudeFormatted
          } is above FL410 and should be one of ${westboundRVSMAltiudes
            .map((altitude) => `FL${altitude}`)
            .join(", ")}.`,
          flightPlanPart: "cruiseAltitude",
          priority: 1,
        });
      }
    }

    await dbEntry.save();

    return {
      success: true,
      data: dbEntry,
    };
  } catch (error) {
    console.log(`Error running ${verifierName}: ${error}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error running ${verifierName}: ${error}`,
    };
  }
}

export default altitudeForDirectionOfFlight;
