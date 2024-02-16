import { isDocument } from "@typegoose/typegoose";
import mainLogger from "../../logger.mjs";
import { VerifierResultModel, VerifierResultStatus } from "../../models/VerifierResult.mjs";
import { VerifierFunction } from "../../types/verifier.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";

const verifierName = "hasEquipmentSuffix";
const logger = mainLogger.child({ service: verifierName });

const hasEquipmentSuffix: VerifierFunction = async function (
  { _id, equipmentSuffix, equipmentInfo },
  saveResult = true
): Promise<VerifierControllerResult> {
  // Set up the default result for a successful run of the verifier.
  let result = new VerifierResultModel({
    flightPlanId: _id,
    verifier: verifierName,
    flightPlanPart: "rawAircraftType",
    priority: 5,
  });

  try {
    // This is the test the verifier is supposed to do.
    if (!equipmentSuffix || equipmentSuffix === "") {
      result.status = VerifierResultStatus.ERROR;
      result.messageId = "missingEquipmentSuffix";
      if (
        isDocument(equipmentInfo) &&
        equipmentInfo.commonEquipmentSuffixes &&
        equipmentInfo.commonEquipmentSuffixes.length > 0
      ) {
        result.message = `Flight plan is missing an equipment suffix. It should probably be one of these: ${equipmentInfo.commonEquipmentSuffixes
          .map((suffix) => `/${suffix}`)
          .joinWithWord("or")}`;
      } else {
        result.message = `Flight plan is missing an equipment suffix.`;
      }
      result.priority = 3;
    } else {
      result.status = VerifierResultStatus.INFORMATION;
      result.messageId = "hasEquipmentSuffix";
      result.message = `Flight plan has an equipment suffix.`;
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

    logger.error(`Error running hasEquipmentSuffix: ${error.message}`, error);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error running hasEquipmentSuffix: ${error.message}`,
    };
  }
};

export default hasEquipmentSuffix;
