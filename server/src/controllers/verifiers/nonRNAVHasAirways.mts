import { IFlightPlan } from "../../models/FlightPlan.mjs";
import VerifierResult from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";

const verifierName = "nonRNAVHasAirways";

export default async function nonRNAVHasAirways({
  _id,
  isRNAVCapable,
  routeHasNonRNAVAirways,
}: IFlightPlan): Promise<VerifierControllerResult> {
  // Set up the default result for a successful run of the verifier.
  var result: VerifierControllerResult = {
    success: true,
    data: new VerifierResult({
      flightPlanId: _id,
      verifier: verifierName,
      flightPlanPart: "route",
      priority: 5,
    }),
  };

  try {
    // No need to check RNAV capable planes
    if (isRNAVCapable) {
      result.data.status = "Information";
      result.data.message = `Plane is RNAV capable so no need to verify the route has airways.`;
      result.data.messageId = "RNAVCapable";
    }
    // If it has the right airways then everything is fine
    else if (routeHasNonRNAVAirways) {
      result.data.status = "Information";
      result.data.message = `Plane is not RNAV capable which is fine, the route has V or T airways.`;
      result.data.messageId = "nonRNAVHasAirways";
    }
    // The route is a problem
    else {
      result.data.status = "Error";
      result.data.message = `Plane is not RNAV capable and the route does not have V or J airways.`;
      result.data.messageId = "nonRNAVNoAirways";
      result.data.priority = 1;
    }

    await result.data.save();
  } catch (error) {
    console.log(`Error running verifyNonRNAVHasAirways: error`);

    result = {
      success: false,
      errorType: "UnknownError",
      error: `Error running verifyNonRNAVHasAirways: error`,
    };
  }

  return result;
}