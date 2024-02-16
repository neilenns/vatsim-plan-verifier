import mainLogger from "../../logger.mjs";
import { FlightPlan } from "../../models/FlightPlan.mjs";
import { VerifierResultModel, VerifierResultStatus } from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";

const verifierName = "validDepartureAirport";
const logger = mainLogger.child({ service: verifierName });

export default async function validDepartureAirport({
  _id,
  departure,
  departureAirportInfo,
}: FlightPlan): Promise<VerifierControllerResult> {
  // Set up the default result for a successful run of the verifier.
  const result = new VerifierResultModel({
    flightPlanId: _id,
    verifier: verifierName,
    flightPlanPart: "departure",
    priority: 5,
  });

  try {
    // This is the test the verifier is supposed to do.
    if (!departureAirportInfo) {
      result.status = VerifierResultStatus.WARNING;
      result.message = `Unable to get departure airport information for ${departure}. Verify it is a real airport.`;
      result.messageId = "noDepartureAirportInfo";
      result.priority = 3;
    } else {
      result.status = VerifierResultStatus.INFORMATION;
      result.message = `${departure} is a valid airport.`;
      result.messageId = "validDepartureAirport";
    }

    const doc = await result.save();
    return {
      success: true,
      data: doc,
    };
  } catch (err) {
    const error = err as Error;

    logger.error(`Error running validDepartureAirport: ${error.message}`, error);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error running validDepartureAirport: ${error.message}`,
    };
  }
}
