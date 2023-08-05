import { IFlightPlan } from "../../models/FlightPlan.mjs";
import VerifierResult from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";
import debug from "debug";

const verifierName = "hasEquipmentSuffix";
const logger = debug(`plan-verifier:${verifierName}`);

export default async function hasEquipmentSuffix({
  _id,
  equipmentSuffix,
  equipmentInfo,
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

  try {
    // This is the test the verifier is supposed to do.
    if (!equipmentSuffix || equipmentSuffix === "") {
      result.data.status = "Error";
      result.data.messageId = "missingEquipmentSuffix";
      if (
        equipmentInfo &&
        equipmentInfo.commonEquipmentSuffixes &&
        equipmentInfo.commonEquipmentSuffixes.length > 0
      ) {
        result.data.message = `Flight plan is missing an equipment suffix. It should probably be one of these: ${equipmentInfo.commonEquipmentSuffixes
          .map((suffix) => `/${suffix}`)
          .joinWithWord("or")}`;
      } else {
        result.data.message = `Flight plan is missing an equipment suffix.`;
      }
      result.data.priority = 3;
    } else {
      result.data.status = "Information";
      result.data.messageId = "hasEquipmentSuffix";
      result.data.message = `Flight plan has an equipment suffix.`;
    }

    await result.data.save();
  } catch (error) {
    logger(`Error running hasEquipmentSuffix: ${error}`);

    result = {
      success: false,
      errorType: "UnknownError",
      error: `Error running hasEquipmentSuffix: ${error}`,
    };
  }

  return result;
}
