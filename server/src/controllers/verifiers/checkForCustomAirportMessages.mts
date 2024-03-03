import mainLogger from "../../logger.mjs";
import { CustomMessageModel, MessageTarget } from "../../models/CustomMessages.mjs";
import {
  type VerifierResultDocument,
  VerifierResultModel,
  VerifierResultStatus,
} from "../../models/VerifierResult.mjs";
import { type VerifierFunction } from "../../types/verifier.mjs";
import { logMongoBulkErrors } from "../../utils.mjs";
import applyMustacheValues from "../../utils/mustache.mjs";

const verifierName = "checkForCustomAirportMessages";
const logger = mainLogger.child({ service: verifierName });

const checkForCustomAirportMessages: VerifierFunction = async function (
  flightPlan,
  saveResult = true
) {
  // Set up the default result for a successful run of the verifier.
  let results: VerifierResultDocument[] = [];

  try {
    const customMessages = await CustomMessageModel.findByTarget(
      MessageTarget.Airport,
      flightPlan.departure
    );

    if (!customMessages || customMessages.length === 0) {
      results.push(
        new VerifierResultModel({
          flightPlanId: flightPlan._id,
          verifier: verifierName,
          flightPlanPart: "departure",
          priority: 5,
          status: VerifierResultStatus.INFORMATION,
          message: `No custom messages for ${flightPlan.departure}`,
          messageId: "noCustomMessages",
        })
      );
    }
    // Convert the custom messages to results
    else {
      results = await Promise.all(
        customMessages.map(async (customMessage) => {
          return new VerifierResultModel({
            flightPlanId: flightPlan._id,
            verifier: verifierName,
            flightPlanPart: "departure",
            status: "CustomMessage",
            priority: customMessage.priority,
            message: await applyMustacheValues(customMessage.message, flightPlan),
            messageId: customMessage.messageId,
          });
        })
      );
    }

    if (saveResult) {
      try {
        await VerifierResultModel.bulkSave(results);
      } catch (err) {
        logMongoBulkErrors(logger, err);
      }
    }

    // Return all the results
    return {
      success: true,
      data: results,
    };
  } catch (err) {
    const error = err as Error;

    logger.error(`Error running checkForCustomAirportMessages: ${error.message}`, error);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error running checkForCustomAirportMessages: ${error.message}`,
    };
  }
};

export default checkForCustomAirportMessages;
