import { getFlightPlan } from "../flightPlans.mjs";

export default async function verifyAltitudeForDirectionOfFlight(
  id: string
): Promise<void> {
  const result = await getFlightPlan(id);

  if (!result.success) {
    console.log(`Unable to verify direction of flight: ${result.error}`);
    return;
  }

  if (!result.data.directionOfFlight) {
    console.log(
      `Unable to verify direction of flight: ${result.data.callsign} has no direction of flight.`
    );
    return;
  }
}
