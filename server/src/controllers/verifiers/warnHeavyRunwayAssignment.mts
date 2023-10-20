import { FlightPlan } from "../../models/FlightPlan.mjs";
import { VerifierResultModel, VerifierResultStatus } from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";
import debug from "debug";
import _ from "lodash";
import { joinWithWord } from "../../utils/formatting.mjs";
import { isDocument } from "@typegoose/typegoose";

const verifierName = "warnHeavyRunwayAssignment";
const logger = debug(`plan-verifier:${verifierName}`);

export default async function warnHeavyRunwayAssignment({
  _id,
  isHeavy,
  departureAirportInfo,
}: FlightPlan): Promise<VerifierControllerResult> {
  // Set up the default result for a successful run of the verifier.
  const result = new VerifierResultModel({
    flightPlanId: _id,
    verifier: verifierName,
    flightPlanPart: "rawAircraftType",
    priority: 5,
  });

  let heavyRunways: string[] | undefined;

  // This nonsense is required to typeguard the extendedAirportInfo property
  // and avoid typescript problems.
  if (!isDocument(departureAirportInfo) || !isDocument(departureAirportInfo?.extendedAirportInfo)) {
    heavyRunways = undefined;
  } else {
    heavyRunways = departureAirportInfo?.extendedAirportInfo?.heavyRunways;
  }

  try {
    // Plane is not a heavy
    if (!isHeavy) {
      result.status = VerifierResultStatus.INFORMATION;
      result.messageId = "notHeavyRunwayAssignment";
      result.message =
        "Aircraft is not a heavy. No need to verify it is assigned to a runway that can accommodate a heavy.";
    }
    // Don't warn if there's no specific heavy runway assignment for the airport
    else if (!heavyRunways) {
      result.status = VerifierResultStatus.INFORMATION;
      result.messageId = "noHeavyRunways";
      result.message =
        "Airport has no heavy runways. No need to verify plane is assigned a runway that can accommodate a heavy.";
    }
    // Plane is a heavy and there are specific runways to assign
    else {
      result.status = VerifierResultStatus.WARNING;
      result.message = `Aircraft is a heavy. Assign runway ${joinWithWord(heavyRunways, "or")}.`;
      result.messageId = "specificHeavyRunwayAssignment";
      result.priority = 3;
    }

    const doc = await result.save();
    return {
      success: true,
      data: doc,
    };
  } catch (error) {
    logger(`Error running ${verifierName}: ${error}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error running ${verifierName}: ${error}`,
    };
  }
}
