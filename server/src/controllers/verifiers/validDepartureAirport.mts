import { IFlightPlan } from "../../models/FlightPlan.mjs";
import VerifierResult from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";

const verifierName = "validDepartureAirport";

export default async function validDepartureAirport({
  _id,
  departure,
  departureAirportInfo,
}: IFlightPlan): Promise<VerifierControllerResult> {
  // Set up the default result for a successful run of the verifier.
  var result: VerifierControllerResult = {
    success: true,
    data: new VerifierResult({
      flightPlanId: _id,
      verifier: verifierName,
      flightPlanPart: "departure",
      priority: 5,
    }),
  };

  try {
    // This is the test the verifier is supposed to do.
    if (!departureAirportInfo) {
      result.data.status = "Warning";
      result.data.message = `Unable to get departure airport information for ${departure}. Verify it is a real airport.`;
      result.data.messageId = "noDepartureAirportInfo";
      result.data.priority = 3;
    } else {
      result.data.status = "Information";
      result.data.message = `${departure} is a valid airport.`;
      result.data.messageId = "validDepartureAirport";
    }

    await result.data.save();
  } catch (error) {
    console.log(`Error running validDepartureAirport: error`);

    result = {
      success: false,
      errorType: "UnknownError",
      error: `Error running validDepartureAirport: error`,
    };
  }

  return result;
}
