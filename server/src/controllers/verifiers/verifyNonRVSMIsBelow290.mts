import { IFlightPlan } from "../../models/FlightPlan.mjs";
import VerifierResult from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";

const verifierName = "verifyNonRVSMIsBelow290";

export default async function verifyNonRVSMIsBelow290({
  _id,
  isRVSMCapable,
  cruiseAltitude,
}: IFlightPlan): Promise<VerifierControllerResult> {
  // Set up the default result for a successful run of the verifier.
  var result: VerifierControllerResult = {
    success: true,
    data: new VerifierResult({
      flightPlanId: _id,
      verifier: verifierName,
      flightPlanPart: "cruiseAltitude",
      priority: 5,
    }),
  };

  try {
    // If the plane is RVSM capable then there's nothing to check
    if (isRVSMCapable) {
      result.data.status = "Information";
      result.data.message = `Plane is RVSM capable so no need to verify its altitude for RVSM compatibility.`;
      result.data.messageId = "RVSMCapable";
    }
    // Plane isn't RVSM capable so make sure it isn't flying too high
    else if (cruiseAltitude >= 290) {
      result.data.status = "Error";
      result.data.message = `Plane is not RVSM capable and is flying at or above FL290.`;
      result.data.messageId = "nonRVSMAtOrAbove290";
      result.data.priority = 3;
    }
    // Plane isn't RVSM capable but altitude is fine
    else {
      result.data.status = "Information";
      result.data.message = `Plane is not RVSM capable but is flying below FL290.`;
      result.data.messageId = "nonRVSMBelow290";
    }

    await result.data.save();
  } catch (error) {
    console.log(`Error running verifyNonRVSMIsBelow290: error`);

    result = {
      success: false,
      errorType: "UnknownError",
      error: `Error running verifyNonRVSMIsBelow290: error`,
    };
  }

  return result;
}
