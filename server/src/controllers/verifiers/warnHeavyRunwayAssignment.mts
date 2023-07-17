import { IFlightPlan } from "../../models/FlightPlan.mjs";
import VerifierResult from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";

export async function warnHeavyRunwayAssignment(
  flightPlan: IFlightPlan
): Promise<VerifierControllerResult> {
  var result: VerifierControllerResult;

  try {
    if (flightPlan.isHeavy) {
      const dbEntry = new VerifierResult({
        flightPlanId: flightPlan._id,
        status: "Warning",
        verifier: "warnHeavyRunwayAssignment",
        message:
          "Aircraft is a heavy. Verify it is assigned to a runway that can accomodate a heavy.",
        flightPlanPart: "rawAircraftType",
        priority: 5,
      });

      await dbEntry.save();

      result = {
        success: true,
        data: dbEntry,
      };
    } else {
      result = {
        success: true,
        data: new VerifierResult({
          flightPlanId: flightPlan._id,
          status: "Information",
          verifier: "warnHeavyRunwayAssignment",
          message:
            "Aircraft is not a heavy. No need to verify it is assigned to a runway that can accomodate a heavy.",
          flightPlanPart: "rawAircraftType",
          priority: 5,
        }),
      };
    }
  } catch (error) {
    console.log(`Error running warnHeavyRunwayAssignment: ${error}`);

    result = {
      success: false,
      errorType: "UnknownError",
      error: `Error running warnHeavyRunwayAssignment: ${error}`,
    };
  }

  return result;
}

export default warnHeavyRunwayAssignment;
