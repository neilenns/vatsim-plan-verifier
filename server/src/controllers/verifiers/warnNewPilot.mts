import { isDocument } from "@typegoose/typegoose";
import debug from "debug";
import pluralize from "pluralize";
import { FlightPlan } from "../../models/FlightPlan.mjs";
import { VerifierResultModel, VerifierResultStatus } from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";

const verifierName = "warnNewPilot";
const logger = debug(`plan-verifier:${verifierName}`);

export default async function warnNewPilot({
  _id,
  pilotStats,
}: FlightPlan): Promise<VerifierControllerResult> {
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

    const doc = await result.save();
    return {
      success: true,
      data: doc,
    };
  } catch (error) {
    logger(`Error running warnNewPilot: ${error}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error running warnNewPilot: ${error}`,
    };
  }
}
