import { IFlightPlan } from "../../models/FlightPlan.mjs";
import VerifierResult from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";
import debug from "debug";
import _ from "lodash";
import { joinWithWord } from "../../utils/formatting.mjs";

const verifierName = "warnHeavyRunwayAssignment";
const logger = debug(`plan-verifier:${verifierName}`);

export default async function warnHeavyRunwayAssignment({
  _id,
  isHeavy,
  departureAirportInfo,
}: IFlightPlan): Promise<VerifierControllerResult> {
  // Set up the default result for a successful run of the verifier.
  let result: VerifierControllerResult = {
    success: true,
    data: new VerifierResult({
      flightPlanId: _id,
      verifier: verifierName,
      flightPlanPart: "rawAircraftType",
      priority: 5,
    }),
  };

  const heavyRunways = departureAirportInfo?.extendedAirportInfo?.heavyRunways;
  try {
    // Plane is not a heavy
    if (!isHeavy) {
      result.data.status = "Information";
      result.data.messageId = "notHeavyRunwayAssignment";
      result.data.message =
        "Aircraft is not a heavy. No need to verify it is assigned to a runway that can accomodate a heavy.";
    }
    // Don't warn if there's no specific heavy runway assignment for the airport
    else if (!heavyRunways) {
      result.data.status = "Information";
      result.data.messageId = "noHeavyRunways";
      result.data.message =
        "Airport has no heavy runways. No need to verify plane is assigned a runway that can accomodate a heavy.";
    }
    // Plane is a heavy and there are specific runways to assign
    else {
      result.data.status = "Warning";
      result.data.message = `Aircraft is a heavy. Assign runway ${joinWithWord(
        heavyRunways,
        "or"
      )}.`;
      result.data.messageId = "specificHeavyRunwayAssignment";
      result.data.priority = 3;
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
