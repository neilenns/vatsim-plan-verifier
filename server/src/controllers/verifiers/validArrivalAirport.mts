import { IFlightPlan } from "../../models/FlightPlan.mjs";
import VerifierResult from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";

const verifierName = "validArrivalAirport";

export default async function validArrivalAirport({
  _id,
  arrivalAirportInfo,
  arrival,
}: IFlightPlan): Promise<VerifierControllerResult> {
  // Set up the default result for a successful run of the verifier.
  var result: VerifierControllerResult = {
    success: true,
    data: new VerifierResult({
      flightPlanId: _id,
      verifier: verifierName,
      flightPlanPart: "arrival",
      priority: 5,
    }),
  };

  try {
    // This is the test the verifier is supposed to do.
    if (!arrivalAirportInfo) {
      result.data.status = "Warning";
      result.data.message = `Unable to get arrival airport information for ${arrival}. Verify it is a real airport.`;
      result.data.messageId = "noArrivalAirportInfo";
      result.data.priority = 3;
    } else {
      result.data.status = "Information";
      result.data.message = `${arrival} is a valid airport.`;
      result.data.messageId = "validArrivalAirport";
    }

    await result.data.save();
  } catch (error) {
    console.log(`Error running validArrivalAirport: error`);

    result = {
      success: false,
      errorType: "UnknownError",
      error: `Error running validArrivalAirport: error`,
    };
  }

  return result;
}