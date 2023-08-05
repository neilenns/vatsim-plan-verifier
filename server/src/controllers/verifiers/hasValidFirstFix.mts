import { IFlightPlan } from "../../models/FlightPlan.mjs";
import VerifierResult from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";
import debug from "debug";

const verifierName = "hasValidFirstFix";
const logger = debug(`plan-verifier:${verifierName}`);

export default async function hasValidFirstFix({
  _id,
  routeParts,
  SID,
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
    } else if (SIDInformation.Fixes.length === 0) {
      result.data.status = "Information";
      result.data.message = `SID ${SID} has no initial fixes so there is no need to verify the route.`;
      result.data.messageId = "noFixesOnDeparture";
    }
    // Finally have all the info necessary to verify the first fix
    else if (!SIDInformation.Fixes.includes(firstFix)) {
      result.data.status = "Error";
      result.data.priority = 1;
      // The message sent is different depending on whether it's an RNAV SID.
      if (SIDInformation.IsRNAV) {
        result.data.message = `First fix ${firstFix} is not in the list of fixes for ${SID}: ${SIDInformation.Fixes.joinWithWord(
          "and"
        )}`;
        result.data.messageId = "firstFixNotInRNAVSID";
      } else {
        result.data.message = `First fix ${firstFix} is not in the list of fixes for ${SID}: ${SIDInformation.Fixes.joinWithWord(
          "and"
        )}, or requires coordination with the online departure controller.`;
        result.data.messageId = "firstFixNotInSID";
      }
    } else {
      result.data.status = "Information";
      result.data.message = `First fix ${firstFix} is valid for ${SID}.`;
      result.data.messageId = "firstFixIsValid";
    }

    await result.data.save();
  } catch (error) {
    logger(`Error running hasValidFirstFix: error`);

    result = {
      success: false,
      errorType: "UnknownError",
      error: `Error running hasValidFirstFix: error`,
    };
  }

  return result;
}
