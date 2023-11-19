import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import IFlightPlan from "../interfaces/IFlightPlan.mts";
import { VatsimPlanLoaderResult } from "../services/vatsimPlanLoader.mts";

export const FlightStrip = () => {
  const loaderData = useLoaderData() as VatsimPlanLoaderResult;
  const [flightPlan, setFlightPlan] = useState<IFlightPlan>({});

  // Handles loading the page with data returned from the loader, and displaying
  // any errors that may have occurred during the loading process.
  useEffect(() => {
    if (!loaderData.success) {
      return;
    }

    setFlightPlan(loaderData.data ?? {});
  }, [loaderData]);

  return (
    <>
      <p>
        {flightPlan.callsign} {flightPlan.rawAircraftType} {flightPlan.departure}{" "}
        {flightPlan.arrival} {flightPlan.squawk} {flightPlan.cruiseAltitude}
      </p>
      <p>{flightPlan.route}</p>
      <p>{flightPlan.remarks}</p>
    </>
  );
};
