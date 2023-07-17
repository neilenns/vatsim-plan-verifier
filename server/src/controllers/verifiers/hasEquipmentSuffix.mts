import { IFlightPlan } from "../../models/FlightPlan.mjs";
import VerifierResult, {
  IVerifierResult,
} from "../../models/VerifierResult.mjs";
import Result from "../../types/result.mjs";

type HasEquipmentSuffixResult = Result<IVerifierResult, "UnknownError">;

export async function hasEquipmentSuffix(
  flightPlan: IFlightPlan
): Promise<HasEquipmentSuffixResult> {
  var result: HasEquipmentSuffixResult;

  try {
    if (!flightPlan.equipmentSuffix || flightPlan.equipmentSuffix === "") {
      const dbEntry = new VerifierResult({
        flightPlanId: flightPlan._id,
        status: "Error",
        verifier: "hasEquipmentSuffix",
        message: "Flight plan is missing an equipment suffix.",
        flightPlanPart: "rawAircraftType",
        priority: 3,
      });

      await dbEntry.save();

      result = {
        success: true,
        data: dbEntry,
      };
    } else {
      const dbEntry = new VerifierResult({
        flightPlanId: flightPlan._id,
        status: "Ok",
        verifier: "hasEquipmentSuffix",
        message: "Flight plan has an equipment suffix.",
        flightPlanPart: "rawAircraftType",
        priority: 3,
      });

      await dbEntry.save();

      result = {
        success: true,
        data: dbEntry,
      };
    }
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

export default hasEquipmentSuffix;
