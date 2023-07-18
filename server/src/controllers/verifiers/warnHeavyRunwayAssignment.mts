import { IFlightPlan } from "../../models/FlightPlan.mjs";
import VerifierResult from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";

const verifierName = "warnHeavyRunwayAssignment";

export default async function warnHeavyRunwayAssignment({
  _id,
  isHeavy,
}: IFlightPlan): Promise<VerifierControllerResult> {
  // Set up the default result for a successful run of the verifier.
  var result: VerifierControllerResult = {
    success: true,
    data: new VerifierResult({
      flightPlanId: _id,
      verifier: verifierName,
      flightPlanPart: "rawAircraftType",
      priority: 5,
    }),
  };

  try {
    // This is the test the verifier is supposed to do. Nice and easy, if it's a heavy
    // give a warning about the runway assignment.
    if (isHeavy) {
      result.data.status = "Warning";
      result.data.message =
        "Aircraft is a heavy. Verify it is assigned to a runway that can accomodate a heavy.";
    }
    // In all other cases there's nothing interesting to report back.
    else {
      result.data.status = "Information";
      result.data.message =
        "Aircraft is not a heavy. No need to verify it is assigned to a runway that can accomodate a heavy.";
    }

    await result.data.save();
  } catch (error) {
    console.log(`Error running ${verifierName}: ${error}`);

    result = {
      success: false,
      errorType: "UnknownError",
      error: `Error running ${verifierName}: ${error}`,
    };
  }

  return result;
}
