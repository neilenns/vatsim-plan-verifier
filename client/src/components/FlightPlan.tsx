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

const FlightPlan: React.FC<FlightPlanProps> = (props: FlightPlanProps) => {
  const [flightPlan, setFlightPlan] = useState<IFlightPlan>(props.flightPlan);
  const [verifierResults, setVerifierResults] = useState<IVerifyAllResult | null>(
    props.verifierResults
  );

  useEffect(() => {
    setFlightPlan(props.flightPlan);
    setVerifierResults(props.verifierResults);
  }, [props.flightPlan, props.verifierResults]);

  const parsePastedFlightPlan = (text: string): boolean => {
    const pastedFlightPlan = parseFlightPlan(text);
    const isValidFlightPlan = validateFlightPlan(pastedFlightPlan);

    // If it's not a valid flight plan then it's a paste of data just for the
    // field so return false and the component will handle it.
    if (!isValidFlightPlan) {
      return false;
    }

    setFlightPlan(pastedFlightPlan);
    return true;
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={2} key="callsign">
        <FlightPlanTextField
          id="callsign"
          label="Callsign"
          value={flightPlan.callsign}
          trim
          onPaste={parsePastedFlightPlan}
          hasErrors={verifierResults?.hasCallsignErrors}
          hasWarnings={verifierResults?.hasCallsignWarnings}
        />
      </Grid>
      <Grid item xs={2} key="aircraft">
        <FlightPlanTextField
          id="rawAircraftType"
          label="Aircraft type"
          value={flightPlan.rawAircraftType}
          trim
          onPaste={parsePastedFlightPlan}
          hasErrors={verifierResults?.hasRawAircraftTypeErrors}
          hasWarnings={verifierResults?.hasRawAircraftTypeWarnings}
        />
      </Grid>
      <Grid item xs={2} key="squawk">
        <FlightPlanTextField
          id="squawk"
          label="Squawk code"
          value={flightPlan.squawk}
          trim
          onPaste={parsePastedFlightPlan}
          hasErrors={verifierResults?.hasSquawkErrors}
          hasWarnings={verifierResults?.hasSquawkWarnings}
        />
      </Grid>
      <Grid item xs={2} key="departure">
        <FlightPlanTextField
          id="departure"
          label="Departure"
          value={flightPlan.departure}
          trim
          onPaste={parsePastedFlightPlan}
          hasErrors={verifierResults?.hasDepartureErrors}
          hasWarnings={verifierResults?.hasDepartureWarnings}
        />
      </Grid>
      <Grid item xs={2} key="arrival">
        <FlightPlanTextField
          id="arrival"
          label="Arrival"
          value={flightPlan.arrival}
          trim
          onPaste={parsePastedFlightPlan}
          hasErrors={verifierResults?.hasArrivalErrors}
          hasWarnings={verifierResults?.hasArrivalWarnings}
        />
      </Grid>
      <Grid item xs={2} key="altitude">
        <FlightPlanTextField
          id="cruiseAltitude"
          label="Cruise altitude"
          value={flightPlan.cruiseAltitude}
          trim
          onPaste={parsePastedFlightPlan}
          hasErrors={verifierResults?.hasCruiseAltitudeErrors}
          hasWarnings={verifierResults?.hasCruiseAltitudeWarnings}
        />
      </Grid>
      <Grid item xs={12} key="route">
        <FlightPlanTextField
          id="route"
          label="Route"
          value={flightPlan.route}
          onPaste={parsePastedFlightPlan}
          hasErrors={verifierResults?.hasRouteErrors}
          hasWarnings={verifierResults?.hasRouteWarnings}
        />
      </Grid>
    </Grid>
  );
};

export default FlightPlan;
