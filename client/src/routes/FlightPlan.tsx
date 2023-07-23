import { Box, Grid } from "@mui/material";
import IFlightPlan from "../interfaces/IFlightPlan.mjs";
import IVerifyAllResult from "../interfaces/IVerifyAllResult.mts";
import { useEffect, useState } from "react";
import FlightPlanTextField from "../components/FlightPlanTextField";
import { parseFlightPlan, validateFlightPlan } from "../utils/flightPlanParser";
import { LoadingButton } from "@mui/lab";
import { Form } from "react-router-dom";

interface FlightPlanProps {
  flightPlan: IFlightPlan;
  verifierResults: IVerifyAllResult | null;
  onStoreFlightPlan: (flightPlan: IFlightPlan) => void;
  onVerify: (result: IVerifyAllResult) => void;
}

const FlightPlan: React.FC<FlightPlanProps> = (props: FlightPlanProps) => {
  const [flightPlan, setFlightPlan] = useState<IFlightPlan>(props.flightPlan);
  const [verifierResults, setVerifierResults] = useState<IVerifyAllResult | null>(null);

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
    <Box sx={{ mt: 1 }}>
      <Form method="post" id="verify-form">
        <Grid container spacing={2}>
          <Grid item xs={2} key="callsign">
            <FlightPlanTextField
              id="callsign"
              label="Callsign"
              name="callsign"
              value={flightPlan.callsign}
              trim
              onPaste={parsePastedFlightPlan}
              onChange={(text) => {
                flightPlan.callsign = text;
              }}
              hasErrors={verifierResults?.hasCallsignErrors}
              hasWarnings={verifierResults?.hasCallsignWarnings}
            />
          </Grid>
          <Grid item xs={2} key="aircraft">
            <FlightPlanTextField
              id="rawAircraftType"
              label="Aircraft type"
              name="rawAircraftType"
              value={flightPlan.rawAircraftType}
              trim
              onPaste={parsePastedFlightPlan}
              onChange={(text) => {
                flightPlan.rawAircraftType = text;
              }}
              hasErrors={verifierResults?.hasRawAircraftTypeErrors}
              hasWarnings={verifierResults?.hasRawAircraftTypeWarnings}
            />
          </Grid>
          <Grid item xs={2} key="squawk">
            <FlightPlanTextField
              id="squawk"
              label="Squawk code"
              name="squawk"
              value={flightPlan.squawk}
              trim
              onPaste={parsePastedFlightPlan}
              onChange={(text) => {
                flightPlan.squawk = text;
              }}
              hasErrors={verifierResults?.hasSquawkErrors}
              hasWarnings={verifierResults?.hasSquawkWarnings}
            />
          </Grid>
          <Grid item xs={2} key="departure">
            <FlightPlanTextField
              id="departure"
              label="Departure"
              name="departure"
              value={flightPlan.departure}
              trim
              onPaste={parsePastedFlightPlan}
              onChange={(text) => {
                flightPlan.departure = text;
              }}
              hasErrors={verifierResults?.hasDepartureErrors}
              hasWarnings={verifierResults?.hasDepartureWarnings}
            />
          </Grid>
          <Grid item xs={2} key="arrival">
            <FlightPlanTextField
              id="arrival"
              label="Arrival"
              name="arrival"
              value={flightPlan.arrival}
              trim
              onPaste={parsePastedFlightPlan}
              onChange={(text) => {
                flightPlan.arrival = text;
              }}
              hasErrors={verifierResults?.hasArrivalErrors}
              hasWarnings={verifierResults?.hasArrivalWarnings}
            />
          </Grid>
          <Grid item xs={2} key="altitude">
            <FlightPlanTextField
              id="cruiseAltitude"
              label="Cruise altitude"
              name="cruiseAltitude"
              value={flightPlan.cruiseAltitude}
              trim
              onPaste={parsePastedFlightPlan}
              onChange={(text) => {
                flightPlan.cruiseAltitude = text;
              }}
              hasErrors={verifierResults?.hasCruiseAltitudeErrors}
              hasWarnings={verifierResults?.hasCruiseAltitudeWarnings}
            />
          </Grid>
          <Grid item xs={12} key="route">
            <FlightPlanTextField
              id="route"
              label="Route"
              name="route"
              value={flightPlan.route}
              onPaste={parsePastedFlightPlan}
              onChange={(text) => {
                flightPlan.route = text;
              }}
              hasErrors={verifierResults?.hasRouteErrors}
              hasWarnings={verifierResults?.hasRouteWarnings}
            />
          </Grid>
          <Grid item xs={2} key="verify">
            <LoadingButton fullWidth type="submit" variant="contained">
              {flightPlan._id ? "Re-verify" : "Verify"}
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </Box>
  );
};

export default FlightPlan;
