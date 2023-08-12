import { FlightPlan } from "../../models/FlightPlan.mjs";
import { VerifierResultModel, VerifierResultStatus } from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";
import debug from "debug";

const verifierName = "checkForNonStandardEquipmentSuffix";
const logger = debug(`plan-verifier:${verifierName}`);

export default async function checkForNonStandardEquipmentSuffix({
  _id,
  equipmentSuffix,
}: FlightPlan): Promise<VerifierControllerResult> {
  // Set up the default result for a successful run of the verifier.
  const result = new VerifierResultModel({
    flightPlanId: _id,
    verifier: verifierName,
    flightPlanPart: "rawAircraftType",
    priority: 5,
  });

  const commonEquipmentSuffixes = [
    "", // Special case to avoid this triggering when no suffix is specified. That gets checked elsewhere.
    "A",
    "G",
    "L",
    "W",
    "Z",
    "I",
    "U",
    "P",
  ];

  try {
    // This is the test the verifier is supposed to do.
    if (!commonEquipmentSuffixes.includes(equipmentSuffix ?? "")) {
      result.status = VerifierResultStatus.WARNING;
      result.messageId = "nonStandardEquipmentSuffix";
      result.message = `Equipment suffix /${equipmentSuffix} is not a common suffix. Verify with the pilot it is correct.`;
      result.priority = 3;
    } else {
      result.status = VerifierResultStatus.INFORMATION;
      result.messageId = "standardEquipmentSuffix";
      result.message = `Equipment suffix /${equipmentSuffix} is common.`;
      result.priority = 5;
    }

    const doc = await result.save();
    return {
      success: true,
      data: doc,
    };
  } catch (error) {
    logger(`Error running checkForNonStandardEquipmentSuffix: error`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error running checkForNonStandardEquipmentSuffix: error`,
    };
  }
}
