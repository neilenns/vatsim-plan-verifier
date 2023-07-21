import { Grid, TextField, createTheme } from "@mui/material";
import IFlightPlan from "../interfaces/IFlightPlan.mjs";
import IVerifyAllResult from "../interfaces/IVerifyAllResult.mts";
import "./flightPlan.css";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";

interface FlightPlanProps {
  flightPlan: IFlightPlan;
  verifierResults: IVerifyAllResult | null;
}

const getColorByStatus = (hasErrors?: boolean, hasWarnings?: boolean) => {
  if (hasErrors) {
    return "error";
  } else if (hasWarnings) {
    return "warning";
  } else if (!hasErrors === undefined && !hasWarnings === undefined) {
    return "success";
  }
};

const flightPlanTheme = createTheme({
  palette: {
    warning: {
      main: "#9daa3d",
    },
  },
});

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
    <ThemeProvider theme={flightPlanTheme}>
      <Grid container spacing={2}>
        <Grid item xs={2} key="callsign">
          <TextField
            id="callsign"
            label="Callsign"
            value={callsign}
            // This nonsense is required to ensure the text moves up above the field when the prop is set. I have no idea
            // why true is first and false is second, that seems backwards to me, but it's what works. Found from
            // this: https://stackoverflow.com/questions/50955603/react-material-ui-label-overlaps-with-text
            InputLabelProps={{ shrink: callsign ? true : false }}
            required
            color={getColorByStatus(
              verifierResults?.hasCallsignErrors,
              verifierResults?.hasCallsignWarnings
            )}
          >
            {flightPlan.callsign}
          </TextField>
        </Grid>
        <Grid item xs={2} key="aircraft">
          <TextField
            id="rawAircraftType"
            label="Aircraft type"
            value={rawAircraftType}
            InputLabelProps={{ shrink: rawAircraftType ? true : false }}
            required
            color={getColorByStatus(
              verifierResults?.hasRawAircraftTypeErrors,
              verifierResults?.hasRawAircraftTypeWarnings
            )}
          >
            {flightPlan.rawAircraftType}
          </TextField>
        </Grid>
        <Grid item xs={2} key="squawk">
          <TextField
            id="squawk"
            label="Squawk code"
            value={squawk}
            InputLabelProps={{ shrink: squawk ? true : false }}
            required
            color={getColorByStatus(
              verifierResults?.hasSquawkErrors,
              verifierResults?.hasSquawkWarnings
            )}
          >
            {flightPlan.squawk}
          </TextField>
        </Grid>
        <Grid item xs={2} key="departure">
          <TextField
            id="departure"
            label="Departure"
            value={departure}
            InputLabelProps={{ shrink: departure ? true : false }}
            required
            color={getColorByStatus(
              verifierResults?.hasDepartureErrors,
              verifierResults?.hasDepartureWarnings
            )}
          >
            {flightPlan.departure}
          </TextField>
        </Grid>
        <Grid item xs={2} key="arrival">
          <TextField
            id="arrival"
            label="Arrival"
            value={arrival}
            InputLabelProps={{ shrink: arrival ? true : false }}
            required
            color={getColorByStatus(
              verifierResults?.hasArrivalErrors,
              verifierResults?.hasArrivalWarnings
            )}
          >
            {flightPlan.arrival}
          </TextField>
        </Grid>
        <Grid item xs={2} key="altitude">
          <TextField
            id="cruiseAltitude"
            label="Cruise altitude"
            value={cruiseAltitude}
            InputLabelProps={{ shrink: cruiseAltitude ? true : false }}
            required
            color={getColorByStatus(
              verifierResults?.hasCruiseAltitudeErrors,
              verifierResults?.hasCruiseAltitudeWarnings
            )}
          >
            {flightPlan.cruiseAltitude}
          </TextField>
        </Grid>
        <Grid item xs={12} key="route">
          <TextField
            fullWidth
            id="route"
            label="Route"
            value={route}
            InputLabelProps={{ shrink: route ? true : false }}
            multiline
            required
            color={getColorByStatus(
              verifierResults?.hasRouteErrors,
              verifierResults?.hasRouteWarnings
            )}
          >
            {flightPlan.route}
          </TextField>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default FlightPlan;
