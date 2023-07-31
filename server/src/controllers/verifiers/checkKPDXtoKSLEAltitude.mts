import { IFlightPlan } from "../../models/FlightPlan.mjs";
import VerifierResult from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";
import debug from "debug";
import { formatAltitude } from "../../utils.mjs";

const verifierName = "checkKPDXtoKSLEAltitude";
const logger = debug(`plan-verifier:${verifierName}`);

export default async function checkKPDXtoKSLEAltitude({
  _id,
  departure,
  arrival,
  cruiseAltitude,
}: IFlightPlan): Promise<VerifierControllerResult> {
  // Set up the default result for a successful run of the verifier.
  let result: VerifierControllerResult = {
    success: true,
    data: new VerifierResult({
      flightPlanId: _id,
      verifier: verifierName,
      flightPlanPart: "cruiseAltitude",
      priority: 5,
    }),
  };

  try {
    if (departure !== "KPDX" || arrival !== "KSLE") {
      result.data.status = "Information";
      result.data.message = `This verifier is only applicable to flights from KPDX to KSLE.`;
      result.data.messageId = "notFromKPDXtoKSLE";
      result.data.priority = 3;
    }
    // Provide phrasing for flights below 5000 feet
    else if (cruiseAltitude < 50) {
      result.data.status = "Warning";
      result.data.message = `Flight is to KSLE. Amend cruise altitude to 5000 feet and issue \"Maintain ${formatAltitude(
        cruiseAltitude,
        false
      )} expect 5,000 five minutes after departure. That will be your final.\"`;
      result.data.messageId = "below5000";
      result.data.priority = 3;
    }
    // Provide phrasing for flights at 5000 feet
    else if (cruiseAltitude === 50) {
      result.data.status = "Warning";
      result.data.message = `Flight is to KSLE. Issue \"Maintain 5,000.\"`;
      result.data.messageId = "at5000";
      result.data.priority = 3;
    }
    // Provide phrasing for flights above 5000 feet
    else {
      result.data.status = "Warning";
      result.data.message = `Flight is to KSLE. Amend cruise altitude to 5000 feet and issue \"Maintain 5,000. that will be your final.\"`;
      result.data.messageId = "above5000";
      result.data.priority = 3;
    }
    await result.data.save();
  } catch (error) {
    logger(`Error running checkKPDXtoKSLEAltitude: error`);

    result = {
      success: false,
      errorType: "UnknownError",
      error: `Error running checkKPDXtoKSLEAltitude: error`,
    };
  }

  return result;
}
