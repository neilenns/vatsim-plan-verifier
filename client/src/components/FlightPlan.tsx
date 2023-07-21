import { Grid } from "@mui/material";
import IFlightPlan from "../interfaces/IFlightPlan.mjs";
import IVerifyAllResult from "../interfaces/IVerifyAllResult.mts";
import { useEffect, useState } from "react";
import FlightPlanTextField from "./FlightPlanTextField";
import { parseFlightPlan, validateFlightPlan } from "../utils/flightPlanParser";

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

  const parsePastedFlightPlan = (text: string): boolean => {
    const pastedFlightPlan = parseFlightPlan(text);
    const isValidFlightPlan = validateFlightPlan(pastedFlightPlan);

    // If it's not a valid flight plan then it's a paste of data just for the
    // field so return false and the component will handle it.
    if (!isValidFlightPlan) {
      return false;
    }
    console.log(text);
    return true;
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={2} key="callsign">
        <FlightPlanTextField
          id="callsign"
          label="Callsign"
          value={callsign}
          onPaste={parsePastedFlightPlan}
          trim
          hasErrors={verifierResults?.hasCallsignErrors}
          hasWarnings={verifierResults?.hasCallsignWarnings}
        />
      </Grid>
      <Grid item xs={2} key="aircraft">
        <FlightPlanTextField
          id="rawAircraftType"
          label="Aircraft type"
          value={rawAircraftType}
          onPaste={parsePastedFlightPlan}
          hasErrors={verifierResults?.hasRawAircraftTypeErrors}
          hasWarnings={verifierResults?.hasRawAircraftTypeWarnings}
        />
      </Grid>
      <Grid item xs={2} key="squawk">
        <FlightPlanTextField
          id="squawk"
          label="Squawk code"
          value={squawk}
          onPaste={parsePastedFlightPlan}
          hasErrors={verifierResults?.hasSquawkErrors}
          hasWarnings={verifierResults?.hasSquawkWarnings}
        />
      </Grid>
      <Grid item xs={2} key="departure">
        <FlightPlanTextField
          id="departure"
          label="Departure"
          value={departure}
          onPaste={parsePastedFlightPlan}
          hasErrors={verifierResults?.hasDepartureErrors}
          hasWarnings={verifierResults?.hasDepartureWarnings}
        />
      </Grid>
      <Grid item xs={2} key="arrival">
        <FlightPlanTextField
          id="arrival"
          label="Arrival"
          value={arrival}
          onPaste={parsePastedFlightPlan}
          hasErrors={verifierResults?.hasArrivalErrors}
          hasWarnings={verifierResults?.hasArrivalWarnings}
        />
      </Grid>
      <Grid item xs={2} key="altitude">
        <FlightPlanTextField
          id="cruiseAltitude"
          label="Cruise altitude"
          value={cruiseAltitude}
          onPaste={parsePastedFlightPlan}
          hasErrors={verifierResults?.hasCruiseAltitudeErrors}
          hasWarnings={verifierResults?.hasCruiseAltitudeWarnings}
        />
      </Grid>
      <Grid item xs={12} key="route">
        <FlightPlanTextField
          id="route"
          label="Route"
          value={route}
          onPaste={parsePastedFlightPlan}
          hasErrors={verifierResults?.hasRouteErrors}
          hasWarnings={verifierResults?.hasRouteWarnings}
        />
      </Grid>
    </Grid>
  );
};

export default FlightPlan;
