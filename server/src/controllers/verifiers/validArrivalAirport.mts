import mainLogger from "../../logger.mjs";
import { VerifierResultModel, VerifierResultStatus } from "../../models/VerifierResult.mjs";
import { type VerifierFunction } from "../../types/verifier.mjs";

const verifierName = "validArrivalAirport";
const logger = mainLogger.child({ service: verifierName });

const validArrivalAirport: VerifierFunction = async function (
  { _id, arrivalAirportInfo, arrival },
  saveResult = true
) {
  // Set up the default result for a successful run of the verifier.
  const result = new VerifierResultModel({
    flightPlanId: _id,
    verifier: verifierName,
    flightPlanPart: "arrival",
    priority: 5,
  });

  try {
    // This is the test the verifier is supposed to do.
    if (arrivalAirportInfo == null) {
      result.status = VerifierResultStatus.WARNING;
      result.message = `Unable to get arrival airport information for ${arrival}. Verify it is a real airport.`;
      result.messageId = "noArrivalAirportInfo";
      result.priority = 3;
    } else {
      result.status = VerifierResultStatus.INFORMATION;
      result.message = `${arrival} is a valid airport.`;
      result.messageId = "validArrivalAirport";
    }

    if (saveResult) {
      await result.save();
    }
    return {
      success: true,
      data: result,
    };
  } catch (err) {
    const error = err as Error;

    logger.error(`Error running validArrivalAirport: ${error.message}`, error);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error running validArrivalAirport: ${error.message}`,
    };
  }
};

export default validArrivalAirport;
