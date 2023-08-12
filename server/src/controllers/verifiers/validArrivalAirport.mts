import { FlightPlan } from "../../models/FlightPlan.mjs";
import { VerifierResultModel, VerifierResultStatus } from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";
import debug from "debug";

const verifierName = "validArrivalAirport";
const logger = debug(`plan-verifier:${verifierName}`);

export default async function validArrivalAirport({
  _id,
  arrivalAirportInfo,
  arrival,
}: FlightPlan): Promise<VerifierControllerResult> {
  // Set up the default result for a successful run of the verifier.
  const result = new VerifierResultModel({
    flightPlanId: _id,
    verifier: verifierName,
    flightPlanPart: "arrival",
    priority: 5,
  });

  try {
    // This is the test the verifier is supposed to do.
    if (!arrivalAirportInfo) {
      result.status = VerifierResultStatus.WARNING;
      result.message = `Unable to get arrival airport information for ${arrival}. Verify it is a real airport.`;
      result.messageId = "noArrivalAirportInfo";
      result.priority = 3;
    } else {
      result.status = VerifierResultStatus.INFORMATION;
      result.message = `${arrival} is a valid airport.`;
      result.messageId = "validArrivalAirport";
    }

    const doc = await result.save();
    return {
      success: true,
      data: doc,
    };
  } catch (err) {
    const error = err as Error;
    logger(`Error running validArrivalAirport: ${error.message}`);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error running validArrivalAirport: ${error.message}`,
    };
  }
}
