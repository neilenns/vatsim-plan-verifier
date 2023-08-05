import { IFlightPlan } from "../../models/FlightPlan.mjs";
import VerifierResult from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";
import debug from "debug";

const verifierName = "checkForNonStandardEquipmentSuffix";
const logger = debug(`plan-verifier:${verifierName}`);

export default async function checkForNonStandardEquipmentSuffix({
  _id,
  equipmentSuffix,
}: IFlightPlan): Promise<VerifierControllerResult> {
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
      result.data.status = "Warning";
      result.data.messageId = "nonStandardEquipmentSuffix";
      result.data.message = `Equipment suffix /${equipmentSuffix} is not a common suffix. Verify with the pilot it is correct.`;
      result.data.priority = 3;
    } else {
      result.data.status = "Information";
      result.data.messageId = "standardEquipmentSuffix";
      result.data.message = `Equipment suffix /${equipmentSuffix} is common.`;
      result.data.priority = 5;
    }

    await result.data.save();
  } catch (error) {
    logger(`Error running checkForNonStandardEquipmentSuffix: error`);

    result = {
      success: false,
      errorType: "UnknownError",
      error: `Error running checkForNonStandardEquipmentSuffix: error`,
    };
  }

  return result;
}
