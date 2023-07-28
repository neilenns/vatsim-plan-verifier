import { IFlightPlan } from "../../models/FlightPlan.mjs";
import VerifierResult from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";
import debug from "debug";

const verifierName = "RNAVFirstFix";
const logger = debug(`plan-verifier:${verifierName}`);

export default async function RNAVFirstFix({
  _id,
  routeParts,
  SIDInformation,
}: IFlightPlan): Promise<VerifierControllerResult> {
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
    if (!SIDInformation) {
      result.data.status = "Information";
      result.data.message = "Unable to verify RNAV first fix, no SID information provided.";
      result.data.messageId = "noSIDInformation";
      result.data.priority = 5;
    } else if (!routeParts || !(routeParts.length >= 2)) {
      result.data.status = "Information";
      result.data.message = "Unable to verify RNAV first fix, no route parts provided.";
      result.data.messageId = "noRouteParts";
      result.data.priority = 5;
    } else if (!SIDInformation.IsRNAV) {
      result.data.status = "Information";
      result.data.message = "Unable to verify RNAV first fix, SID is not RNAV.";
      result.data.messageId = "notRNAV";
      result.data.priority = 5;
    } else if (!SIDInformation.Fixes || !(SIDInformation.Fixes.length > 0)) {
      result.data.status = "Information";
      result.data.message = "Unable to verify RNAV first fix, no SID fixes provided.";
      result.data.messageId = "noSIDFixes";
      result.data.priority = 5;
    }
    // The actual test
    else if (!SIDInformation.Fixes.includes(routeParts[1])) {
      result.data.status = "Error";
      result.data.message = `The first fix in the route is not a valid first fix for the SID. It should be one of: ${SIDInformation.Fixes.join(
        ", "
      )}.`;
      result.data.messageId = "firstFixNotValid";
      result.data.priority = 1;
    } else {
      result.data.status = "Information";
      result.data.message = `The first fix in the route matches a valid first fix for the SID.`;
      result.data.messageId = "firstFixValid";
      result.data.priority = 5;
    }

    await result.data.save();
  } catch (error) {
    logger(`Error running RNAVFirstFix: error`);

    result = {
      success: false,
      errorType: "UnknownError",
      error: `Error running RNAVFirstFix: error`,
    };
  }

  return result;
}
