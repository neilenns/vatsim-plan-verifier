import { isDocument } from "@typegoose/typegoose";
import pluralize from "pluralize";
import mainLogger from "../../logger.mjs";
import { VerifierResultModel, VerifierResultStatus } from "../../models/VerifierResult.mjs";
import { type VerifierFunction } from "../../types/verifier.mjs";

const verifierName = "warnNewPilot";
const logger = mainLogger.child({ service: verifierName });

const warnNewPilot: VerifierFunction = async function ({ _id, pilotStats }, saveResult = true) {
  // Set up the default result for a successful run of the verifier.
  const result = new VerifierResultModel({
    flightPlanId: _id,
    verifier: verifierName,
    flightPlanPart: "callsign",
    priority: 5,
  });

  try {
    // This is the test the verifier is supposed to do.
    if (!isDocument(pilotStats)) {
      result.status = VerifierResultStatus.INFORMATION;
      result.message = `Pilot stats are not available for this flight plan.`;
      result.messageId = "pilotStatsNotAvailable";
      result.priority = 3;
    } else if (pilotStats.pilot === 0) {
      result.status = VerifierResultStatus.WARNING;
      result.message = `Pilot is brand new, this is their first VATSIM flight.`;
      result.messageId = "brandNewPilot";
      result.priority = 1;
    } else if (pilotStats.pilot < 50) {
      result.status = VerifierResultStatus.WARNING;
      result.message = `Pilot is new with only ${pluralize(
        "hour",
        Math.round(pilotStats.pilot),
        true
      )} of flight time.`;
      result.messageId = "newPilot";
      result.priority = 1;
    } else {
      result.status = VerifierResultStatus.INFORMATION;
      result.message = `Pilot is not a new pilot`;
      result.messageId = "pilotNotNew";
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

    logger.error(`Error running warnNewPilot: ${error.message}`, error);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error running warnNewPilot: ${error.message}`,
    };
  }
};

export default warnNewPilot;
