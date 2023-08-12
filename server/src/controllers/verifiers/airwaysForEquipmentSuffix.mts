import { FlightPlan } from "../../models/FlightPlan.mjs";
import VerifierResult from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";
import debug from "debug";

const verifierName = "airwaysForEquipmentSuffix";
const logger = debug(`plan-verifier:${verifierName}`);

export default async function airwaysForEquipmentSuffix({
  _id,
  equipmentSuffix,
  isGNSSCapable,
  isRNAVCapable,
  routeParts,
}: FlightPlan): Promise<VerifierControllerResult> {
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

  const rnavRoutesRegex = /^Q\d{1,4}$/;
  const gnssRoutesRegex = /^T\d{1,4}$/;

  try {
    // If there's no equiment suffix then there's nothing to check
    if (!equipmentSuffix) {
      result.data.status = "Information";
      result.data.messageId = "noEquipmentSuffix";
      result.data.message = "No equipment suffix, unable to validate airways.";
      result.data.priority = 5;
    }
    // Can't do anything if there's no route
    else if (!routeParts || routeParts.length === 0) {
      result.data.status = "Information";
      result.data.messageId = "noRouteParts";
      result.data.message = "No route specified, unable to validate airways.";
      result.data.priority = 5;
    }
    // If the plane is GNSS and RVSM capable then there's nothing to check
    else if (isGNSSCapable && isRNAVCapable) {
      result.data.status = "Information";
      result.data.messageId = "isRNAVandGNSSCapable";
      result.data.message = "Aircraft is RNAV and GNSS capable, no need to validate airways.";
      result.data.priority = 5;
    }
    // Check and make sure non-RNAV planes aren't on Q routes
    else if (!isRNAVCapable && routeParts?.some((part) => rnavRoutesRegex.test(part))) {
      result.data.status = "Warning";
      result.data.messageId = "nonRNAVonRNAVAirways";
      result.data.message = `Aircraft is /${equipmentSuffix} which does not support RNAV but the route includes a Q airway.`;
      result.data.priority = 3;
    }
    // Check and make sure non-GNSS planes aren't on T routes
    else if (!isGNSSCapable && routeParts?.some((part) => gnssRoutesRegex.test(part))) {
      result.data.status = "Warning";
      result.data.messageId = "nonGNSSonGNSSAirways";
      result.data.message = `Aircraft is /${equipmentSuffix} which does not support GNSS but the route includes a T airway.`;
      result.data.priority = 3;
    }
    // All good!
    else {
      result.data.status = "Information";
      result.data.messageId = "planeCanFlyAirways";
      result.data.message = `Aircraft is /${equipmentSuffix} which does not support GNSS and the airways are fine.`;
      result.data.priority = 5;
    }

    await result.data.save();
  } catch (error) {
    logger(`Error running airwaysForEquipmentSuffix: error`);

    result = {
      success: false,
      errorType: "UnknownError",
      error: `Error running airwaysForEquipmentSuffix: error`,
    };
  }

  return result;
}
