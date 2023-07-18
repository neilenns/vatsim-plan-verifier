import { IFlightPlan } from "../../models/FlightPlan.mjs";
import VerifierResult from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";

const verifierName = "hasEquipmentSuffix";

export default async function hasEquipmentSuffix({
  _id,
  equipmentSuffix,
}: IFlightPlan): Promise<VerifierControllerResult> {
  // Set up the default result for a successful run of the verifier.
  var result: VerifierControllerResult = {
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
      result.data.message = `Flight plan is missing an equipment suffix.`;
      result.data.priority = 3;
    } else {
      result.data.status = "Information";
      result.data.messageId = "hasEquipmentSuffix";
      result.data.message = `Flight plan has an equipment suffix.`;
    }

    await result.data.save();
  } catch (error) {
    console.log(`Error running hasEquipmentSuffix: ${error}`);

    result = {
      success: false,
      errorType: "UnknownError",
      error: `Error running hasEquipmentSuffix: ${error}`,
    };
  }

  return result;
}
