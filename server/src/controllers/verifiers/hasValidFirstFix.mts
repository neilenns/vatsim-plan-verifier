import { isDocument } from "@typegoose/typegoose";
import mainLogger from "../../logger.mjs";
import { VerifierResultModel, VerifierResultStatus } from "../../models/VerifierResult.mjs";
import { type VerifierFunction } from "../../types/verifier.mjs";

const verifierName = "hasValidFirstFix";
const logger = mainLogger.child({ service: verifierName });

const hasValidFirstFix: VerifierFunction = async function (
  { _id, routeParts, SID, SIDInformation },
  saveResult = true
) {
  // Set up the default result for a successful run of the verifier.
  const result = new VerifierResultModel({
    flightPlanId: _id,
    verifier: verifierName,
    flightPlanPart: "route",
    priority: 5,
  });

  try {
    const firstFix = routeParts?.[1];

    if (SID == null) {
      result.status = VerifierResultStatus.INFORMATION;
      result.message = `Route likely doesn't have a SID so can't verify first fix.`;
      result.messageId = "noSID";
    } else if (firstFix === undefined) {
      result.status = VerifierResultStatus.INFORMATION;
      result.message = `Route doesn't have at least two parts so can't verify first fix.`;
      result.messageId = "noFirstFix";
    } else if (!isDocument(SIDInformation)) {
      result.status = VerifierResultStatus.INFORMATION;
      result.message = `No information available for ${SID} so can't verify first fix.`;
      result.messageId = "noSIDInformation";
    } else if (SIDInformation.Fixes.length === 0) {
      result.status = VerifierResultStatus.INFORMATION;
      result.message = `SID ${SID} has no initial fixes so there is no need to verify the route.`;
      result.messageId = "noFixesOnDeparture";
    }
    // Finally have all the info necessary to verify the first fix
    else if (!SIDInformation.Fixes.includes(firstFix)) {
      result.status = VerifierResultStatus.ERROR;
      result.priority = 1;
      // The message sent is different depending on whether it's an RNAV SID.
      if (SIDInformation.IsRNAV) {
        result.message = `First fix ${firstFix} is not in the list of fixes for ${SID}: ${SIDInformation.Fixes.joinWithWord(
          "and"
        )}`;
        result.messageId = "firstFixNotInRNAVSID";
      } else {
        result.message = `First fix ${firstFix} is not in the list of fixes for ${SID}: ${SIDInformation.Fixes.joinWithWord(
          "and"
        )}, or requires coordination with the online departure controller.`;
        result.messageId = "firstFixNotInSID";
      }
    } else {
      result.status = VerifierResultStatus.INFORMATION;
      result.message = `First fix ${firstFix} is valid for ${SID}.`;
      result.messageId = "firstFixIsValid";
    }

    if (saveResult) {
      await result.save();
    }

    return {
      success: true,
      data: result,
    };
  } catch (err) {
    const error = err as Error;

    logger.error(`Error running hasValidFirstFix: ${error.message}`, error);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error running hasValidFirstFix: ${error.message}`,
    };
  }
};

export default hasValidFirstFix;
