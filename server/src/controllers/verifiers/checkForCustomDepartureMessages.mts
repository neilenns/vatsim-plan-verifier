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

const verifierName = "checkForCustomDepartureMessages";
const logger = mainLogger.child({ service: verifierName });

const checkForCustomDepartureMessages: VerifierFunction = async function (
  flightPlan,
  saveResult = true
) {
  // Set up the default result for a successful run of the verifier.
  let results: VerifierResultDocument[] = [];

  try {
    if (flightPlan.SID == null) {
      results.push(
        new VerifierResultModel({
          flightPlanId: flightPlan._id,
          verifier: verifierName,
          flightPlanPart: "route",
          priority: 5,
          status: VerifierResultStatus.INFORMATION,
          message: `No SID available for the route, skipping checking for custom messages.`,
          messageId: "noSID",
        })
      );
    } else {
      const customMessages = await CustomMessageModel.findByTarget(
        MessageTarget.Departure,
        flightPlan.SID,
        flightPlan.flow
      );

      if (customMessages == null || customMessages.length === 0) {
        results.push(
          new VerifierResultModel({
            flightPlanId: flightPlan._id,
            verifier: verifierName,
            flightPlanPart: "route",
            priority: 5,
            status: VerifierResultStatus.INFORMATION,
            message: `No custom messages for ${flightPlan.SID}`,
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
              flightPlanPart: "route",
              status: "CustomMessage",
              priority: customMessage.priority,
              message: await applyMustacheValues(customMessage.message, flightPlan),
              messageId: customMessage.messageId,
            });
          })
        );
      }
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

    logger.error(`Error running checkForCustomDepartureMessages: ${error.message}`, error);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error running checkForCustomDepartureMessages: ${error.message}`,
    };
  }
};

export default checkForCustomDepartureMessages;
