import mainLogger from "../../logger.mjs";
import { VerifierResultModel, VerifierResultStatus } from "../../models/VerifierResult.mjs";
import { VerifierFunction } from "../../types/verifier.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";
import { getMetar } from "../metar.mjs";

const verifierName = "altitudeForAltimeter";
const logger = mainLogger.child({ service: verifierName });

const altitudeForAltimeter: VerifierFunction = async function (
  { _id, departure, cruiseAltitude, cruiseAltitudeFormatted },
  saveResult = true
) {
  // Set up the default result for a successful run of the verifier.
  let result: VerifierControllerResult = {
    success: true,
    data: new VerifierResultModel({
      flightPlanId: _id,
      verifier: verifierName,
      flightPlanPart: "cruiseAltitude",
      priority: 5,
    }),
  };

  try {
    // get the altimeter for the airport
    const metar = await getMetar(departure);

    if (!metar.success || !metar.data || !metar.data.altimeter) {
      result.data.status = VerifierResultStatus.INFORMATION;
      result.data.message = `Unable to retrieve metar for ${departure}, skipping altitude check.`;
      result.data.priority = 5;
      result.data.messageId = "UnableToRetrieveMetar";
    } else if (cruiseAltitude < 180) {
      result.data.status = VerifierResultStatus.INFORMATION;
      result.data.message = `Cruise altitude is below 18,000, skipping altitude check.`;
      result.data.priority = 5;
      result.data.messageId = "AltitudeIsLowEnough";
    } else if (metar.data.altimeter >= 29.92) {
      result.data.status = VerifierResultStatus.INFORMATION;
      result.data.message = `Altimeter at ${departure} is 29.92 or higher, skipping altitude check.`;
      result.data.priority = 5;
      result.data.messageId = "AltimeterIsHighEnough";
    }
    // If the altimeter is too low and the plane is crusing from FL180 to just below FL190 throw an error
    else if (
      metar.data.altimeter >= 28.92 &&
      metar.data.altimeter <= 29.91 &&
      cruiseAltitude >= 180 &&
      cruiseAltitude < 190
    ) {
      result.data.status = VerifierResultStatus.ERROR;
      result.data.message = `${departure} altimeter is ${metar.data.altimeter} so cruise altitude ${cruiseAltitudeFormatted} is unavailable. Offer at least FL190.`;
      result.data.priority = 3;
      result.data.messageId = "FL180Unavailable";
    }
    // If the altimeter is *very* low and the plane is cruising below FL200 throw an error
    else if (metar.data.altimeter <= 28.91 && cruiseAltitude >= 180 && cruiseAltitude < 200) {
      result.data.status = VerifierResultStatus.ERROR;
      result.data.message = `${departure} altimeter is ${metar.data.altimeter} so cruise altitude ${cruiseAltitudeFormatted} is unavailable. Offer at least FL200.`;
      result.data.priority = 3;
      result.data.messageId = "FL190Unavailable";
    } else {
      result.data.status = VerifierResultStatus.INFORMATION;
      result.data.message = `${departure} altimeter is ${metar.data.altimeter} so cruise altitude ${cruiseAltitudeFormatted} is fine.`;
      result.data.priority = 5;
      result.data.messageId = "AltitudeOk";
    }

    if (saveResult) {
      await result.data.save();
    }
  } catch (err) {
    const error = err as Error;

    logger.error(`Error running altitudeForAltiemter: ${error.message}`, error);

    result = {
      success: false,
      errorType: "UnknownError",
      error: `Error running altitudeForAltiemter: ${error.message}`,
    };
  }

  return result;
};

export default altitudeForAltimeter;
