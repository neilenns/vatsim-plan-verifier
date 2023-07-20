import { Grid, Typography } from "@mui/material";
import IFlightPlan from "../interfaces/IFlightPlan.mjs";
import IVerifyAllResult from "../interfaces/IVerifyAllResult.mts";
import "./flightPlanDisplay.css";

interface FlightPlanProps {
  flightPlan: IFlightPlan;
  verifierResults: IVerifyAllResult | null;
}

const getClassByStatus = (hasErrors?: boolean, hasWarnings?: boolean) => {
  if (hasErrors) {
    return "hasErrors";
  } else if (hasWarnings) {
    return "hasWarnings";
  } else {
    return "isOk";
  }
};

const FlightPlanDisplay: React.FC<FlightPlanProps> = ({ flightPlan, verifierResults }: FlightPlanProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={2} key="callsign">
        <Typography variant="subtitle1">Callsign</Typography>
        <Typography
          variant="body1"
          className={getClassByStatus(verifierResults?.hasCallsignErrors, verifierResults?.hasCallsignWarnings)}
        >
          {flightPlan.callsign}
        </Typography>
      </Grid>
      <Grid item xs={2} key="aircraft">
        <Typography variant="subtitle1">Aircraft</Typography>
        <Typography
          variant="body1"
          className={getClassByStatus(
            verifierResults?.hasRawAircraftTypeErrors,
            verifierResults?.hasRawAircraftTypeWarnings
          )}
        >
          {flightPlan.rawAircraftType}
        </Typography>
      </Grid>
      <Grid item xs={2} key="squawk">
        <Typography variant="subtitle1">Squawk code</Typography>
        <Typography
          variant="body1"
          className={getClassByStatus(verifierResults?.hasSquawkErrors, verifierResults?.hasSquawkWarnings)}
        >
          {flightPlan.squawk}
        </Typography>
      </Grid>
      <Grid item xs={2} key="departure">
        <Typography variant="subtitle1">Departure</Typography>
        <Typography
          variant="body1"
          className={getClassByStatus(verifierResults?.hasDepartureErrors, verifierResults?.hasDepartureWarnings)}
        >
          {flightPlan.departure}
        </Typography>
      </Grid>
      <Grid item xs={2} key="arrival">
        <Typography variant="subtitle1">Arrival</Typography>
        <Typography
          variant="body1"
          className={getClassByStatus(verifierResults?.hasArrivalErrors, verifierResults?.hasArrivalWarnings)}
        >
          {flightPlan.arrival}
        </Typography>
      </Grid>
      <Grid item xs={2} key="altitude">
        <Typography variant="subtitle1">Cruise altitude</Typography>
        <Typography
          variant="body1"
          className={getClassByStatus(
            verifierResults?.hasCruiseAltitudeErrors,
            verifierResults?.hasCruiseAltitudeWarnings
          )}
        >
          {flightPlan.cruiseAltitude}
        </Typography>
      </Grid>
      <Grid item xs={12} key="route">
        <Typography variant="subtitle1">Route</Typography>
        <Typography
          variant="body1"
          className={getClassByStatus(verifierResults?.hasRouteErrors, verifierResults?.hasRouteWarnings)}
        >
          {flightPlan.route}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default FlightPlanDisplay;
