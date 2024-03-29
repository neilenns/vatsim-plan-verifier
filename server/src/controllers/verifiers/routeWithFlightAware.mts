import pluralize from "pluralize";
import mainLogger from "../../logger.mjs";
import { VerifierResultModel, VerifierResultStatus } from "../../models/VerifierResult.mjs";
import { type VerifierFunction } from "../../types/verifier.mjs";
import { getFlightAwareRoutes } from "../flightAwareRoutes.mjs";

const verifierName = "routeWithFlightAware";
const logger = mainLogger.child({ service: verifierName });

const routeWithFlightAware: VerifierFunction = async function (
  { _id, departure, arrival, cleanedRoute, SID, cruiseAltitude },
  saveResult = true
) {
  const result = new VerifierResultModel({
    flightPlanId: _id,
    verifier: verifierName,
    flightPlanPart: "route",
    priority: 5,
  });

  const flightAwareRoutes = await getFlightAwareRoutes({ departure, arrival });

  // Bail early if no FlightAware routes found.
  if (
    !flightAwareRoutes.success ||
    flightAwareRoutes.data.length === 0 ||
    // This is the case where FlightAware returned no routes for the departure/arrival pair.
    // There will be one result in the database with a count of 0, indicating no flights
    // were ever recorded by FlightAware for that pair.
    (flightAwareRoutes.data.length === 1 && flightAwareRoutes.data[0].count === 0)
  ) {
    result.status = VerifierResultStatus.INFORMATION;
    result.message = `No FlightAware routes found for ${departure} to ${arrival}`;
    result.priority = 3;
    result.messageId = "noFlightAwareRoutes";

    const doc = await result.save();
    return {
      success: true,
      data: doc,
    };
  }

  try {
    // FlightAware doesn't include radar vector SIDs in their routes.
    // Strip off the SID from the cleaned route to use when checking
    // against FlightAware routes.
    const cleanedRouteNoSid = cleanedRoute?.replace(`${SID} `, "");

    // Find the first matching route. The assumption is FlightAware won't return multiple
    // entries for the same route.
    const matchingRoute = flightAwareRoutes.data.find((route) => {
      // This tests both with and without the SID
      return route.route === cleanedRoute || route.route === cleanedRouteNoSid;
    });

    // No matching routes found so send along the recommended routes from FlightAware.
    if (matchingRoute == null) {
      result.status = VerifierResultStatus.WARNING;
      result.messageId = "doesNotMatchFlightAwareRoutes";
      result.message = `Route doesn't match any FlightAware routes. Common routes include:`;
      result.extendedMessage = flightAwareRoutes.data
        .sort((a, b) => b.count - a.count)
        .map(
          (route) =>
            `${route.route} flown ${pluralize("time", route.count, true)} at ${
              route.filedAltitudesFormatted
            }`
        );
      result.priority = 4;
    }
    // Matching routes found and the cruise altitude matches too.
    else if (
      cruiseAltitude >= matchingRoute.filedAltitudeMin &&
      cruiseAltitude <= matchingRoute.filedAltitudeMax
    ) {
      result.status = VerifierResultStatus.OK;
      result.messageId = "matchesFlightAwareRouteAndAltitudes";
      result.message = `Route matches a FlightAware route flown ${pluralize(
        "time",
        matchingRoute.count,
        true
      )} and the cruise altitude is within the range of typical filed altitudes.`;
      result.priority = 3;
    }
    // Matching routes found but the cruise altitude doesn't match.
    else {
      result.status = VerifierResultStatus.WARNING;
      result.messageId = "matchesFlightAwareRouteNotAltitudes";
      result.message = `Route matches a FlightAware route flown ${pluralize(
        "time",
        matchingRoute.count,
        true
      )} but the altitude is typically ${matchingRoute.filedAltitudesFormatted}.`;
      result.priority = 4;
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

    logger.error(`Error running verifyRouteWithFlightAware: ${error.message}`, error);

    return {
      success: false,
      errorType: "UnknownError",
      error: `Error running verifyRouteWithFlightAware: ${error.message}`,
    };
  }
};

export default routeWithFlightAware;
