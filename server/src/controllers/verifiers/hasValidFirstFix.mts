import { IFlightPlan } from "../../models/FlightPlan.mjs";
import VerifierResult from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";

const verifierName = "hasValidFirstFix";

export default async function hasValidFirstFix({
  _id,
  routeParts,
  SID,
  SIDInformation,
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
    const firstFix = routeParts?.[1];

    if (!SID) {
      result.data.status = "Information";
      result.data.message = `Route likely doesn't have a SID so can't verify first fix.`;
      result.data.messageId = "noSID";
    } else if (!firstFix) {
      result.data.status = "Information";
      result.data.message = `Route doesn't have at least two parts so can't verify first fix.`;
      result.data.messageId = "noFirstFix";
    } else if (!SIDInformation) {
      result.data.status = "Information";
      result.data.message = `No information available for ${SID} so can't verify first fix.`;
      result.data.messageId = "noSIDInformation";
    }
    // Finally have all the info necessary to verify the first fix
    else if (!SIDInformation.Fixes.includes(firstFix)) {
      result.data.status = "Error";
      result.data.message = `First fix ${firstFix} is not in the list of fixes for ${SID}:`;
      result.data.extendedMessage = [SIDInformation.Fixes.join(", ")];
      result.data.messageId = "firstFixNotInSID";
      result.data.priority = 1;
    } else {
      result.data.status = "Information";
      result.data.message = `First fix ${firstFix} is valid for ${SID}.`;
      result.data.messageId = "firstFixIsValid";
    }

    await result.data.save();
  } catch (error) {
    console.log(`Error running hasValidFirstFix: error`);

    result = {
      success: false,
      errorType: "UnknownError",
      error: `Error running hasValidFirstFix: error`,
    };
  }

  return result;
}
