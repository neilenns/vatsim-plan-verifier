import { isDocument } from "@typegoose/typegoose";
import { FlightPlan } from "../../models/FlightPlan.mjs";
import { VerifierResultModel, VerifierResultStatus } from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";
import debug from "debug";

const verifierName = "hasEquipmentSuffix";
const logger = debug(`plan-verifier:${verifierName}`);

export default async function hasEquipmentSuffix({
  _id,
  equipmentSuffix,
  equipmentInfo,
}: FlightPlan): Promise<VerifierControllerResult> {
  // Set up the default result for a successful run of the verifier.
  const result = new VerifierResultModel({
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

    const doc = await result.save();
    return {
      success: true,
      data: doc,
    };
  } catch (error) {
    logger(`Error running hasEquipmentSuffix: ${error}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error running hasEquipmentSuffix: ${error}`,
    };
  }
}
