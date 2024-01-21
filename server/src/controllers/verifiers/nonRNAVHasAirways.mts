import mainLogger from "../../logger.mjs";
import { FlightPlan } from "../../models/FlightPlan.mjs";
import { VerifierResultModel, VerifierResultStatus } from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";

const verifierName = "nonRNAVHasAirways";
const logger = mainLogger.child({ service: verifierName });

export default async function nonRNAVHasAirways({
  _id,
  isRNAVCapable,
  routeHasNonRNAVAirways,
  equipmentSuffix,
}: FlightPlan): Promise<VerifierControllerResult> {
  // Set up the default result for a successful run of the verifier.
  const result = new VerifierResultModel({
    flightPlanId: _id,
    verifier: verifierName,
    flightPlanPart: "route",
    priority: 5,
  });

  try {
    if (!equipmentSuffix) {
      result.status = VerifierResultStatus.INFORMATION;
      result.message = "No equipment suffix so no need to verify the route has airways.";
      result.messageId = "noEquipmentSuffix";
    }
    // No need to check RNAV capable planes
    else if (isRNAVCapable) {
      result.status = VerifierResultStatus.INFORMATION;
      result.message = `Plane is RNAV capable so no need to verify the route has airways.`;
      result.messageId = "RNAVCapable";
    }
    // If it has the right airways then everything is fine
    else if (routeHasNonRNAVAirways) {
      result.status = VerifierResultStatus.INFORMATION;
      result.message = `Plane is not RNAV capable which is fine, the route has V or T airways.`;
      result.messageId = "nonRNAVHasAirways";
    }
    // The route is a problem
    else {
      result.status = VerifierResultStatus.ERROR;
      result.message = `Plane is not RNAV capable and the route does not have V or J airways.`;
      result.messageId = "nonRNAVNoAirways";
      result.priority = 1;
    }

    const doc = await result.save();
    return {
      success: true,
      data: doc,
    };
  } catch (error) {
    logger.error(`Error running verifyNonRNAVHasAirways: ${error}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error running verifyNonRNAVHasAirways: ${error}`,
    };
  }
}
