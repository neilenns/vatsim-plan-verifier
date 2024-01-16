import debug from "debug";
import { FlightPlan } from "../../models/FlightPlan.mjs";
import { VatsimCommunicationMethod } from "../../models/VatsimFlightPlan.mjs";
import { VerifierResultModel, VerifierResultStatus } from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";

const verifierName = "warnTextOnlyPilot";
const logger = debug(`plan-verifier:${verifierName}`);

export default async function warnTextOnlyPilot({
  _id,
  communicationMethod,
}: FlightPlan): Promise<VerifierControllerResult> {
  // Set up the default result for a successful run of the verifier.
  let result: VerifierControllerResult = {
    success: true,
    data: new VerifierResultModel({
      flightPlanId: _id,
      verifier: verifierName,
      flightPlanPart: "callsign",
      priority: 5,
    }),
  };

  try {
    // This is the test the verifier is supposed to do.
    if (communicationMethod === VatsimCommunicationMethod.TEXTONLY) {
      result.data.status = VerifierResultStatus.WARNING;
      result.data.message = `Pilot is a text-only pilot`;
      result.data.messageId = "textOnlyPilot";
      result.data.priority = 5;
    } else if (communicationMethod === VatsimCommunicationMethod.RECEIVE) {
      result.data.status = VerifierResultStatus.INFORMATION;
      result.data.message = `Pilot is a receive pilot`;
      result.data.messageId = "receivePilot";
    } else {
      result.data.status = VerifierResultStatus.INFORMATION;
      result.data.message = `Pilot is a voice pilot`;
      result.data.messageId = "voicePilot";
    }

    await result.data.save();
  } catch (error) {
    logger(`Error running warnTextOnlyPilot: ${error}`);

    result = {
      success: false,
      errorType: "UnknownError",
      error: `Error running warnTextOnlyPilot: ${error}`,
    };
  }

  return result;
}
