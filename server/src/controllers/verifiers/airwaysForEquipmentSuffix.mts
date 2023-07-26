import { IFlightPlan } from "../../models/FlightPlan.mjs";
import VerifierResult from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";

const verifierName = "airwaysForEquipmentSuffix";

export default async function airwaysForEquipmentSuffix({
  _id,
  equipmentSuffix,
  isGNSSCapable,
  routeParts,
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

  const gnssRoutesRegex = /^[TQ]\d{1,4}$/;

  try {
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
    // If the plane is GNSS capable then there's nothing to check
    else if (isGNSSCapable) {
      result.data.status = "Information";
      result.data.messageId = "isGNSSCapable";
      result.data.message = "Aircraft is GNSS capable, no need to validate airways.";
      result.data.priority = 5;
    }
    // The plane isn't GNSS capable so see if any routes are GPS routes
    else if (routeParts?.some((part) => gnssRoutesRegex.test(part))) {
      result.data.status = "Warning";
      result.data.messageId = "GNSSonNonGNSSAirways";
      result.data.message = `Aircraft is /${equipmentSuffix} which does not support GNSS but the route includes a GPS airway.`;
      result.data.priority = 3;
    }
    // All good!
    else {
      result.data.status = "Information";
      result.data.messageId = "NonGNSSonNonGNSSAirways";
      result.data.message = `Aircraft is /${equipmentSuffix} which does not support GNSS and the airways are fine.`;
      result.data.priority = 5;
    }

    await result.data.save();
  } catch (error) {
    console.log(`Error running airwaysForEquipmentSuffix: error`);

    result = {
      success: false,
      errorType: "UnknownError",
      error: `Error running airwaysForEquipmentSuffix: error`,
    };
  }

  return result;
}
