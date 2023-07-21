import { Grid } from "@mui/material";
import IFlightPlan from "../interfaces/IFlightPlan.mjs";
import IVerifyAllResult from "../interfaces/IVerifyAllResult.mts";
import { useEffect, useState } from "react";
import FlightPlanTextField from "./FlightPlanTextField";

interface FlightPlanProps {
  flightPlan: IFlightPlan;
  verifierResults: IVerifyAllResult | null;
}

const FlightPlan: React.FC<FlightPlanProps> = ({
  flightPlan,
  verifierResults,
}: FlightPlanProps) => {
  const [callsign, setCallsign] = useState<string>(flightPlan.callsign);
  const [rawAircraftType, setRawAircraftType] = useState<string>(flightPlan.rawAircraftType);
  const [squawk, setSquawk] = useState<string>(flightPlan.squawk);
  const [departure, setDeparture] = useState<string>(flightPlan.departure);
  const [arrival, setArrival] = useState<string>(flightPlan.arrival);
  const [cruiseAltitude, setCruiseAltitude] = useState<string>(flightPlan.cruiseAltitude);
  const [route, setRoute] = useState<string>(flightPlan.route);

  useEffect(() => {
    setCallsign(flightPlan.callsign);
    setRawAircraftType(flightPlan.rawAircraftType);
    setSquawk(flightPlan.squawk);
    setDeparture(flightPlan.departure);
    setArrival(flightPlan.arrival);
    setCruiseAltitude(flightPlan.cruiseAltitude);
    setRoute(flightPlan.route);
  }, [flightPlan]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={2} key="callsign">
        <FlightPlanTextField
          id="callsign"
          label="Callsign"
          value={callsign}
          hasErrors={verifierResults?.hasCallsignErrors}
          hasWarnings={verifierResults?.hasCallsignWarnings}
        />
      </Grid>
      <Grid item xs={2} key="aircraft">
        <FlightPlanTextField
          id="rawAircraftType"
          label="Aircraft type"
          value={rawAircraftType}
          hasErrors={verifierResults?.hasRawAircraftTypeErrors}
          hasWarnings={verifierResults?.hasRawAircraftTypeWarnings}
        />
      </Grid>
      <Grid item xs={2} key="squawk">
        <FlightPlanTextField
          id="squawk"
          label="Squawk code"
          value={squawk}
          hasErrors={verifierResults?.hasSquawkErrors}
          hasWarnings={verifierResults?.hasSquawkWarnings}
        />
      </Grid>
      <Grid item xs={2} key="departure">
        <FlightPlanTextField
          id="departure"
          label="Departure"
          value={departure}
          hasErrors={verifierResults?.hasDepartureErrors}
          hasWarnings={verifierResults?.hasDepartureWarnings}
        />
      </Grid>
      <Grid item xs={2} key="arrival">
        <FlightPlanTextField
          id="arrival"
          label="Arrival"
          value={arrival}
          hasErrors={verifierResults?.hasArrivalErrors}
          hasWarnings={verifierResults?.hasArrivalWarnings}
        />
      </Grid>
      <Grid item xs={2} key="altitude">
        <FlightPlanTextField
          id="cruiseAltitude"
          label="Cruise altitude"
          value={cruiseAltitude}
          hasErrors={verifierResults?.hasCruiseAltitudeErrors}
          hasWarnings={verifierResults?.hasCruiseAltitudeWarnings}
        />
      </Grid>
      <Grid item xs={12} key="route">
        <FlightPlanTextField
          id="route"
          label="Route"
          value={route}
          hasErrors={verifierResults?.hasRouteErrors}
          hasWarnings={verifierResults?.hasRouteWarnings}
        />
      </Grid>
    </Grid>
  );
};

export default FlightPlan;
