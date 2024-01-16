import debug from "debug";
import { FlightPlan } from "../../models/FlightPlan.mjs";
import { VerifierResultModel, VerifierResultStatus } from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";
import { formatAltitude } from "../../utils.mjs";

const verifierName = "checkKPDXtoKSLEAltitude";
const logger = debug(`plan-verifier:${verifierName}`);

export default async function checkKPDXtoKSLEAltitude({
  _id,
  departure,
  arrival,
  cruiseAltitude,
}: FlightPlan): Promise<VerifierControllerResult> {
  // Set up the default result for a successful run of the verifier.
  const result = new VerifierResultModel({
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

    const doc = await result.save();
    return {
      success: true,
      data: doc,
    };
  } catch (error) {
    logger(`Error running checkKPDXtoKSLEAltitude: ${error}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error running checkKPDXtoKSLEAltitude: ${error}`,
    };
  }
}
