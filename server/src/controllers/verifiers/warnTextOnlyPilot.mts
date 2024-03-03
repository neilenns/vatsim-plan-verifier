import mainLogger from "../../logger.mjs";
import { VatsimCommunicationMethod } from "../../models/VatsimFlightPlan.mjs";
import { VerifierResultModel, VerifierResultStatus } from "../../models/VerifierResult.mjs";
import { type VerifierFunction } from "../../types/verifier.mjs";

const verifierName = "warnTextOnlyPilot";
const logger = mainLogger.child({ service: verifierName });

const warnTextOnlyPilot: VerifierFunction = async function warnTextOnlyPilot(
  { _id, communicationMethod },
  saveResult = true
) {
  // Set up the default result for a successful run of the verifier.
  const result = new VerifierResultModel({
    flightPlanId: _id,
    verifier: verifierName,
    flightPlanPart: "callsign",
    priority: 5,
  });

  try {
    // This is the test the verifier is supposed to do.
    if (communicationMethod === VatsimCommunicationMethod.TEXTONLY) {
      result.status = VerifierResultStatus.WARNING;
      result.message = `Pilot is a text-only pilot`;
      result.messageId = "textOnlyPilot";
      result.priority = 5;
    } else if (communicationMethod === VatsimCommunicationMethod.RECEIVE) {
      result.status = VerifierResultStatus.INFORMATION;
      result.message = `Pilot is a receive pilot`;
      result.messageId = "receivePilot";
    } else {
      result.status = VerifierResultStatus.INFORMATION;
      result.message = `Pilot is a voice pilot`;
      result.messageId = "voicePilot";
    }

    if (saveResult) {
      result.save();
    }
    return {
      success: true,
      data: result,
    };
  } catch (err) {
    const error = err as Error;

    logger.error(`Error running warnTextOnlyPilot: ${error.message}`, error);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error running warnTextOnlyPilot: ${error.message}`,
    };
  }
};

export default warnTextOnlyPilot;
