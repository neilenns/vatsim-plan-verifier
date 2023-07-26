import { IFlightPlan } from "../../models/FlightPlan.mjs";
import VerifierResult from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";

const verifierName = "hasSID";

export default async function hasSID({ _id, SID }: IFlightPlan): Promise<VerifierControllerResult> {
  // Set up the default result for a successful run of the verifier.
  let result: VerifierControllerResult = {
    success: true,
    data: new VerifierResult({
      flightPlanId: _id,
      verifier: verifierName,
      flightPlanPart: "route",
      priority: 5,
    }),
  };

  try {
    // This is the test the verifier is supposed to do.
    if (!SID) {
      result.data.status = "Warning";
      result.data.message = `Flight plan may not have a SID.`;
      result.data.messageId = "noSID";
      result.data.priority = 3;
    } else {
      result.data.status = "Information";
      result.data.message = `Flight plan appears to have a SID.`;
      result.data.messageId = "hasSID";
    }

    await result.data.save();
  } catch (error) {
    console.log(`Error running hasSID: error`);

    result = {
      success: false,
      errorType: "UnknownError",
      error: `Error running hasSID: error`,
    };
  }

  return result;
}
