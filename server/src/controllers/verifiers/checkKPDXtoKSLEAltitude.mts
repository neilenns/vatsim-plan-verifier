import mainLogger from "../../logger.mjs";
import { VerifierResultModel, VerifierResultStatus } from "../../models/VerifierResult.mjs";
import { VerifierFunction } from "../../types/verifier.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";
import { formatAltitude } from "../../utils.mjs";

const verifierName = "checkKPDXtoKSLEAltitude";
const logger = mainLogger.child({ service: verifierName });

const checkKPDXtoKSLEAltitude: VerifierFunction = async function (
  { _id, departure, arrival, cruiseAltitude },
  saveResult = true
): Promise<VerifierControllerResult> {
  // Set up the default result for a successful run of the verifier.
  let result = new VerifierResultModel({
    flightPlanId: _id,
    verifier: verifierName,
    flightPlanPart: "cruiseAltitude",
    priority: 5,
  });

  try {
    if (departure !== "KPDX" || arrival !== "KSLE") {
      result.status = VerifierResultStatus.INFORMATION;
      result.message = `This verifier is only applicable to flights from KPDX to KSLE.`;
      result.messageId = "notFromKPDXtoKSLE";
      result.priority = 3;
    }
    // Provide phrasing for flights below 5000 feet
    else if (cruiseAltitude < 50) {
      result.status = VerifierResultStatus.WARNING;
      result.message = `Flight is to KSLE. Amend cruise altitude to 5000 feet and issue \"Maintain ${formatAltitude(
        cruiseAltitude,
        false
      )} expect 5,000 five minutes after departure. That will be your final.\"`;
      result.messageId = "below5000";
      result.priority = 3;
    }
    // Provide phrasing for flights at 5000 feet
    else if (cruiseAltitude === 50) {
      result.status = VerifierResultStatus.WARNING;
      result.message = `Flight is to KSLE. Issue \"Maintain 5,000.\"`;
      result.messageId = "at5000";
      result.priority = 3;
    }
    // Provide phrasing for flights above 5000 feet
    else {
      result.status = VerifierResultStatus.WARNING;
      result.message = `Flight is to KSLE. Amend cruise altitude to 5000 feet and issue \"Maintain 5,000. That will be your final.\"`;
      result.messageId = "above5000";
      result.priority = 3;
    }

    if (saveResult) {
      result = await result.save();
    }
    return {
      success: true,
      data: result,
    };
  } catch (err) {
    const error = err as Error;

    logger.error(`Error running checkKPDXtoKSLEAltitude: ${error.message}`, error);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error running checkKPDXtoKSLEAltitude: ${error.message}`,
    };
  }
};

export default checkKPDXtoKSLEAltitude;
