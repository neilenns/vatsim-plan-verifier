import { isDocument } from "@typegoose/typegoose";
import { FlightPlan } from "../../models/FlightPlan.mjs";
import VerifierResult from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";
import debug from "debug";

const verifierName = "pistonNotSlantLorZ";
const logger = debug(`plan-verifier:${verifierName}`);

export default async function pistonNotSlantLorZ({
  _id,
  equipmentSuffix,
  equipmentInfo,
}: FlightPlan): Promise<VerifierControllerResult> {
  // Set up the default result for a successful run of the verifier.
  let result: VerifierControllerResult = {
    success: true,
    data: new VerifierResult({
      flightPlanId: _id,
      verifier: verifierName,
      flightPlanPart: "rawAircraftType",
      priority: 5,
    }),
  };

  try {
    if (!equipmentSuffix) {
      result.data.status = "Information";
      result.data.message =
        "Unable to verify equipment suffix against aircraft engine type, no equipment suffix provided.";
      result.data.messageId = "noEquipmentSuffix";
      result.data.priority = 5;
    } else if (!isDocument(equipmentInfo) || !equipmentInfo.engineType) {
      result.data.status = "Information";
      result.data.message =
        "Unable to verify equipment suffix against aircraft engine type, no aircraft engine type provided.";
      result.data.messageId = "noEngineType";
      result.data.priority = 5;
    } else if (
      equipmentInfo.engineType === "P" &&
      (equipmentSuffix === "L" || equipmentSuffix === "Z")
    ) {
      result.data.status = "Warning";
      result.data.message = `Aircraft engine type is piston, but equipment suffix is /${equipmentSuffix}. This is almost certainly wrong.`;
      result.data.messageId = "pistonWithSlantLorZ";
      result.data.priority = 3;
    } else {
      result.data.status = "Information";
      result.data.message = "Aircraft engine type and equipment suffix are likely a fine pairing.";
      result.data.messageId = "engineTypeAndEquipmentSuffixLikelyFine";
      result.data.priority = 5;
    }

    await result.data.save();
  } catch (error) {
    logger(`Error running pistonNotSlantLorZ: error`);

    result = {
      success: false,
      errorType: "UnknownError",
      error: `Error running pistonNotSlantLorZ: error`,
    };
  }

  return result;
}
