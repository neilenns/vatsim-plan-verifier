import { IFlightPlan } from "../../models/FlightPlan.mjs";
import VerifierResult from "../../models/VerifierResult.mjs";
import VerifierControllerResult from "../../types/verifierControllerResult.mjs";
import { getFlightAwareRoutes } from "../flightAwareRoutes.mjs";
import pluralize from "pluralize";

const verifierName = "verifyRouteWithFlightAware";

export default async function verifyRouteWithFlightAware({
  _id,
  departure,
  arrival,
  cleanedRoute,
  cruiseAltitude,
}: IFlightPlan): Promise<VerifierControllerResult> {
  // Set up the default result for a successful run of the verifier.
  var result: VerifierControllerResult = {
    success: true,
    data: new VerifierResult({
      flightPlanId: _id,
      verifier: verifierName,
      flightPlanPart: "route",
      priority: 5,
    }),
  };

  const flightAwareRoutes = await getFlightAwareRoutes({ departure, arrival });

  // Bail early if no FlightAware routes found.
  if (!flightAwareRoutes.success || flightAwareRoutes.data.length === 0) {
    result.data.status = "Information";
    result.data.message = `No FlightAware routes found for ${departure} to ${arrival}`;
    result.data.priority = 3;
    result.data.messageId = "noFlightAwareRoutes";

    await result.data.save();
    return result;
  }

  try {
    // Find the first matching route. The assumption is FlightAware won't return multiple
    // entries for the same route.
    var matchingRoute = flightAwareRoutes.data.find((route) => {
      return route.route === cleanedRoute;
    });

    // No matching routes found so send along the recommended routes from FlightAware.
    if (!matchingRoute) {
      result.data.status = "Warning";
      result.data.messageId = "doesNotMatchFlightAwareRoutes";
      result.data.message = `No FlightAware routes found for ${departure} to ${arrival} matching ${cleanedRoute}. Possible valid routes:`;
      result.data.extendedMessage = flightAwareRoutes.data.map(
        (route) =>
          `${route.route} flown ${pluralize("time", route.count, true)} at ${
            route.filedAltitudesFormatted
          }`
      );
      result.data.priority = 3;
    }
    // Matching routes found and the cruise altitude matches too.
    else if (
      cruiseAltitude >= matchingRoute.filedAltitudeMin &&
      cruiseAltitude <= matchingRoute.filedAltitudeMax
    ) {
      result.data.status = "Information";
      result.data.messageId = "matchesFlightAwareRouteAndAltitudes";
      result.data.message = `Route matches a FlightAware route flown ${pluralize(
        "time",
        matchingRoute.count,
        true
      )} and the cruise altitude is within the range of typical filed altitudes.`;
      result.data.priority = 3;
    }
    // Matching routes found but the cruise altitude doesn't match.
    else {
      result.data.status = "Warning";
      result.data.messageId = "matchesFlightAwareRouteNotAltitudes";
      result.data.message = `Route matches a FlightAware route flown ${pluralize(
        "time",
        matchingRoute.count,
        true
      )} but the altitude is typically ${
        matchingRoute.filedAltitudesFormatted
      }.`;
      result.data.priority = 3;
    }

    await result.data.save();
  } catch (error) {
    console.log(`Error running verifyRouteWithFlightAware: error`);

    result = {
      success: false,
      errorType: "UnknownError",
      error: `Error running verifyRouteWithFlightAware: error`,
    };
  }

  return result;
}
