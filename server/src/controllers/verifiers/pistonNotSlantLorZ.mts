import { isDocument } from "@typegoose/typegoose";
import mainLogger from "../../logger.mjs";
import { FlightPlan } from "../../models/FlightPlan.mjs";
import { VerifierResultModel, VerifierResultStatus } from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";
import { VerifierFunction } from "../../types/verifier.mjs";

const verifierName = "pistonNotSlantLorZ";
const logger = mainLogger.child({ service: verifierName });

const pistonNotSlantLorZ: VerifierFunction = async function (
  { _id, equipmentSuffix, equipmentInfo },
  saveResult = true
) {
  // Set up the default result for a successful run of the verifier.
  const result = new VerifierResultModel({
    flightPlanId: _id,
    verifier: verifierName,
    flightPlanPart: "rawAircraftType",
    priority: 5,
  });

  try {
    if (!equipmentSuffix) {
      result.status = VerifierResultStatus.INFORMATION;
      result.message =
        "Unable to verify equipment suffix against aircraft engine type, no equipment suffix provided.";
      result.messageId = "noEquipmentSuffix";
      result.priority = 5;
    } else if (!isDocument(equipmentInfo) || !equipmentInfo.engineType) {
      result.status = VerifierResultStatus.INFORMATION;
      result.message =
        "Unable to verify equipment suffix against aircraft engine type, no aircraft engine type provided.";
      result.messageId = "noEngineType";
      result.priority = 5;
    } else if (
      equipmentInfo.engineType === "P" &&
      (equipmentSuffix === "L" || equipmentSuffix === "Z")
    ) {
      result.status = VerifierResultStatus.WARNING;
      result.message = `Aircraft engine type is piston, but equipment suffix is /${equipmentSuffix}. This is almost certainly wrong.`;
      result.messageId = "pistonWithSlantLorZ";
      result.priority = 3;
    } else {
      result.status = VerifierResultStatus.INFORMATION;
      result.message = "Aircraft engine type and equipment suffix are likely a fine pairing.";
      result.messageId = "engineTypeAndEquipmentSuffixLikelyFine";
      result.priority = 5;
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

    logger.error(`Error running pistonNotSlantLorZ: ${error.message}`, error);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error running pistonNotSlantLorZ: ${error.message}`,
    };
  }
};

export default pistonNotSlantLorZ;
