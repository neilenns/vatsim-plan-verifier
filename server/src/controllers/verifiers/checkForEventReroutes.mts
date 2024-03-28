import mainLogger from "../../logger.mjs";
import { EventRerouteModel } from "../../models/EventReroutes.mjs";
import { AirportFlow } from "../../models/InitialAltitude.mjs";
import { VerifierResultModel, VerifierResultStatus } from "../../models/VerifierResult.mjs";
import { VerifierFunction } from "../../types/verifier.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";

const verifierName = "checkForEventReroutes";
const logger = mainLogger.child({ service: verifierName });

const checkForEventReroutes: VerifierFunction = async function (
  { _id, departure, routeParts, flow, route },
  saveResult = true
) {
  // Set up the default result for a successful run of the verifier.
  let result: VerifierControllerResult = {
    success: true,
    data: new VerifierResultModel({
      flightPlanId: _id,
      verifier: verifierName,
      flightPlanPart: "route",
      priority: 5,
    }),
  };

  try {
    // Can't be calculated without a route
    if (routeParts.length === 0 || route === undefined || route?.length === 0) {
      result.data.status = VerifierResultStatus.INFORMATION;
      result.data.message = `No route provided.`;
      result.data.messageId = "noRoute";

      if (saveResult) {
        await result.data.save();
      }
      return result;
    }

    // Airport flow must be specified
    if (flow === AirportFlow.Unknown) {
      result.data.status = VerifierResultStatus.ERROR;
      result.data.message = `Unable to check for event reroutes since the airport flow isn't set.`;
      result.data.messageId = "unknownAirportFlow";

      if (saveResult) {
        await result.data.save();
      }
      return result;
    }

    // Look up event re-routes for the given departure airport and flow
    const eventReroutes = await EventRerouteModel.findEventReroutes(departure, flow);

    // No event routes for the departure and flow so bail.
    if (eventReroutes === null || eventReroutes.length === 0) {
      result.data.status = VerifierResultStatus.INFORMATION;
      result.data.messageId = "noEventReroutes";
      result.data.message = `No event reroutes found for ${departure} in ${flow} flow.`;
      result.data.priority = 5;

      if (saveResult) {
        await result.data.save();
      }
      return result;
    }

    // Check to see if any event routes have fixes that overlap with the filed route and
    // airport flow.
    const applicableReroutes = eventReroutes.filter((reroute) => {
      return routeParts.includes(reroute.fix) && (reroute.flow === "ANY" || flow === reroute.flow);
    });

    // No overlapping fixes for the current flow so there's no applicable event routes, bail.
    if (applicableReroutes.length === 0) {
      result.data.status = VerifierResultStatus.INFORMATION;
      result.data.message = `No event reroutes found for ${departure} in ${flow} with route ${routeParts.join(
        " "
      )}.`;
      result.data.messageId = "noMatchingEventReroutes";
      result.data.priority = 5;

      if (saveResult) {
        await result.data.save();
      }
      return result;
    }

    // At this point the route has mandatory reroutes.
    result.data.status = VerifierResultStatus.WARNING;
    result.data.message = `Filed route has a required event reroute:`;
    result.data.extendedMessage = applicableReroutes.map((reroute) => {
      return `${route.replace(reroute.fix, reroute.replacement)}`;
    });
    result.data.messageId = "notRequiredEventRoute";
    result.data.priority = 1;

    if (saveResult) {
      await result.data.save();
    }
    return result;
  } catch (err) {
    const error = err as Error;
    logger.error(`Error running checkForEventReroutes: ${error.message}`, error);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error running checkForEventReroutes: ${error.message}`,
    };
  }
};

export default checkForEventReroutes;
