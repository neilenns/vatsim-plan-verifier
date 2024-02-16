import mainLogger from "../../logger.mjs";
import { FlightPlan } from "../../models/FlightPlan.mjs";
import { VerifierResultModel, VerifierResultStatus } from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";

const verifierName = "airwaysForEquipmentSuffix";
const logger = mainLogger.child({ service: verifierName });

export default async function airwaysForEquipmentSuffix({
  _id,
  equipmentSuffix,
  isGNSSCapable,
  isRNAVCapable,
  routeParts,
}: FlightPlan): Promise<VerifierControllerResult> {
  // Set up the default result for a successful run of the verifier.
  const result = new VerifierResultModel({
    flightPlanId: _id,
    verifier: verifierName,
    flightPlanPart: "route",
    priority: 5,
  });

  const rnavRoutesRegex = /^Q\d{1,4}$/;
  const gnssRoutesRegex = /^T\d{1,4}$/;

  try {
    // If there's no equiment suffix then there's nothing to check
    if (!equipmentSuffix) {
      result.status = VerifierResultStatus.INFORMATION;
      result.messageId = "noEquipmentSuffix";
      result.message = "No equipment suffix, unable to validate airways.";
      result.priority = 5;
    }
    // Can't do anything if there's no route
    else if (!routeParts || routeParts.length === 0) {
      result.status = VerifierResultStatus.INFORMATION;
      result.messageId = "noRouteParts";
      result.message = "No route specified, unable to validate airways.";
      result.priority = 5;
    }
    // If the plane is GNSS and RVSM capable then there's nothing to check
    else if (isGNSSCapable && isRNAVCapable) {
      result.status = VerifierResultStatus.INFORMATION;
      result.messageId = "isRNAVandGNSSCapable";
      result.message = "Aircraft is RNAV and GNSS capable, no need to validate airways.";
      result.priority = 5;
    }
    // Check and make sure non-RNAV planes aren't on Q routes
    else if (!isRNAVCapable && routeParts?.some((part) => rnavRoutesRegex.test(part))) {
      result.status = VerifierResultStatus.WARNING;
      result.messageId = "nonRNAVonRNAVAirways";
      result.message = `Aircraft is /${equipmentSuffix} which does not support RNAV but the route includes a Q airway.`;
      result.priority = 3;
    }
    // Check and make sure non-GNSS planes aren't on T routes
    else if (!isGNSSCapable && routeParts?.some((part) => gnssRoutesRegex.test(part))) {
      result.status = VerifierResultStatus.WARNING;
      result.messageId = "nonGNSSonGNSSAirways";
      result.message = `Aircraft is /${equipmentSuffix} which does not support GNSS but the route includes a T airway.`;
      result.priority = 3;
    }
    // All good!
    else {
      result.status = VerifierResultStatus.INFORMATION;
      result.messageId = "planeCanFlyAirways";
      result.message = `Aircraft is /${equipmentSuffix} which does not support GNSS and the airways are fine.`;
      result.priority = 5;
    }

    const doc = await result.save();
    return {
      success: true,
      data: doc,
    };
  } catch (err) {
    const error = err as Error;

    logger.error(`Error running airwaysForEquipmentSuffix: ${error.message}`, error);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error running airwaysForEquipmentSuffix: ${error.message}`,
    };
  }
}
