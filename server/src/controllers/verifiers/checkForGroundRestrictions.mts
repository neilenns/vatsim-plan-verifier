import { isDocument } from "@typegoose/typegoose";
import mainLogger from "../../logger.mjs";
import { GroundRestrictionModel } from "../../models/GroundRestrictions.mjs";
import {
  VerifierResultDocument,
  VerifierResultModel,
  VerifierResultStatus,
} from "../../models/VerifierResult.mjs";
import { VerifierFunction } from "../../types/verifier.mjs";
import { logMongoBulkErrors } from "../../utils.mjs";
import applyMustacheValues from "../../utils/mustache.mjs";
import { PromisePool } from "@supercharge/promise-pool";

const verifierName = "checkForGroundRestrictions";
const logger = mainLogger.child({ service: verifierName });

const checkForGroundRestrictions: VerifierFunction = async function (
  flightPlan,
  saveResult = true
) {
  // Set up the default result for a successful run of the verifier.
  let results: VerifierResultDocument[] = [];

  try {
    let group = 0;
    let wingspan = 0;
    let tailHeight = 0;
    // Get the group for the aircraft from the record, if there is equipment info available.
    if (isDocument(flightPlan.equipmentInfo)) {
      group = flightPlan.equipmentInfo?.airplaneDesignGroup ?? 0;
      wingspan = flightPlan.equipmentInfo?.wingspan ?? 0;
      tailHeight = flightPlan.equipmentInfo?.tailHeight ?? 0;
    }

    const groundRestrictions = await GroundRestrictionModel.findByAirportAndFlightPlanDetails(
      flightPlan.departure,
      flightPlan.equipmentCode ?? "",
      group,
      wingspan,
      tailHeight
    );

    if (!groundRestrictions || groundRestrictions.length === 0) {
      results.push(
        new VerifierResultModel({
          flightPlanId: flightPlan._id,
          verifier: verifierName,
          flightPlanPart: "rawAircraftType",
          priority: 5,
          status: VerifierResultStatus.INFORMATION,
          message: `No ground restrictions for ${flightPlan.departure} ${flightPlan.equipmentCode}`,
          messageId: "noGroundRestrictions",
        })
      );
    }
    // Convert the custom messages to results
    else {
      const { results: poolResults } = await PromisePool.for(groundRestrictions).process(
        async (customMessage) => {
          return new VerifierResultModel({
            flightPlanId: flightPlan._id,
            verifier: verifierName,
            flightPlanPart: "rawAircraftType",
            status: "CustomMessage",
            priority: 3,
            message: await applyMustacheValues(customMessage.message, flightPlan),
            messageId: "groundRestriction",
          });
        }
      );

      results = poolResults;
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

    logger.error(`Error running checkForGroundRestrictions: ${error.message}`, error);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error running checkForGroundRestrictions: ${error.message}`,
    };
  }
};

export default checkForGroundRestrictions;
