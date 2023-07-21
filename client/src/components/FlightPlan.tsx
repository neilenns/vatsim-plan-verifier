import { Box, Button, Grid } from "@mui/material";
import IFlightPlan from "../interfaces/IFlightPlan.mjs";
import IVerifyAllResult from "../interfaces/IVerifyAllResult.mts";
import { useEffect, useState } from "react";
import FlightPlanTextField from "./FlightPlanTextField";
import { parseFlightPlan, validateFlightPlan } from "../utils/flightPlanParser";
import { LoadingButton } from "@mui/lab";
import { storeFlightPlan } from "../db/flightPlan.mts";
import { runAllVerifiers } from "../db/runAllVerifiers.mts";

interface FlightPlanProps {
  flightPlan: IFlightPlan;
  verifierResults: IVerifyAllResult | null;
  onStoreFlightPlan: (flightPlan: IFlightPlan) => void;
  onVerify: (result: IVerifyAllResult) => void;
  onReset: () => void;
}

const FlightPlan: React.FC<FlightPlanProps> = (props: FlightPlanProps) => {
  const [flightPlan, setFlightPlan] = useState<IFlightPlan>(props.flightPlan);
  const [verifying, setVerifying] = useState(false);
  const [verifierResults, setVerifierResults] = useState<IVerifyAllResult | null>(null);

  useEffect(() => {
    setFlightPlan(props.flightPlan);
    setVerifierResults(props.verifierResults);
  }, [props.flightPlan, props.verifierResults]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Handle the case where the flight plan was already verified
    if (flightPlan._id !== undefined) {
      console.log("Flight plan already verified, eventually this will do a nice reverification.");
      flightPlan._id = undefined;
      return;
    }

    setVerifying(true);

    storeFlightPlan(flightPlan)
      .then((storedFlightPlan) => {
        props.onStoreFlightPlan(storedFlightPlan);

        runAllVerifiers(storedFlightPlan)
          .then((result) => {
            props.onVerify(result);
          })
          .catch((error: Error) => {
            console.log(error);
          });
      })
      .catch((error: Error) => {
        console.log(error);
      })
      .finally(() => {
        setVerifying(false);
      });
  };

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
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={2} key="callsign">
          <FlightPlanTextField
            id="callsign"
            label="Callsign"
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
          <LoadingButton fullWidth loading={verifying} type="submit" variant="contained">
            Verify
          </LoadingButton>
        </Grid>
        <Grid item xs={2} key="reset">
          <Button fullWidth variant="contained" onClick={props.onReset}>
            Reset
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FlightPlan;
