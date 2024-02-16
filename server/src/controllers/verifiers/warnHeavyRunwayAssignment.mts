import { isDocument } from "@typegoose/typegoose";
import mainLogger from "../../logger.mjs";
import { FlightPlan } from "../../models/FlightPlan.mjs";
import { VerifierResultModel, VerifierResultStatus } from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";
import { joinWithWord } from "../../utils/formatting.mjs";
import { VerifierFunction } from "../../types/verifier.mjs";

const verifierName = "warnHeavyRunwayAssignment";
const logger = mainLogger.child({ service: verifierName });

const warnHeavyRunwayAssignment: VerifierFunction = async function (
  { _id, isHeavy, isSuper, departureAirportInfo },
  saveResult = true
) {
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
    // Plane is not a heavy or a super
    if (!isHeavy && !isSuper) {
      result.status = VerifierResultStatus.INFORMATION;
      result.messageId = "notHeavyRunwayAssignment";
      result.message =
        "Aircraft is not a heavy or a super. No need to verify it is assigned to a runway that can accommodate iut.";
    }
    // Don't warn if there's no specific heavy runway assignment for the airport
    else if (!heavyRunways) {
      result.status = VerifierResultStatus.INFORMATION;
      result.messageId = "noHeavyRunways";
      result.message =
        "Airport has no heavy runways. No need to verify plane is assigned a runway that can accommodate a heavy or super.";
    }
    // Plane is a heavy and there are specific runways to assign
    else {
      result.status = VerifierResultStatus.WARNING;
      result.message = `Aircraft is a heavy or super. Assign runway ${joinWithWord(
        heavyRunways,
        "or"
      )}.`;
      result.messageId = "specificHeavyRunwayAssignment";
      result.priority = 3;
    }

    if (saveResult) {
      await result.save();
    }
    return {
      success: true,
      data: result,
    };
  } catch (err) {
    const error = err as Error;

    logger.error(`Error running ${verifierName}: ${error.message}`, error);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error running ${verifierName}: ${error.message}`,
    };
  }
};

export default warnHeavyRunwayAssignment;
