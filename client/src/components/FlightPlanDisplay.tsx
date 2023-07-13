import { Grid, Typography } from "@mui/material";
import IFlightPlan from "../interfaces/IFlightPlan.mts";

interface FlightPlanProps {
  flightPlan: IFlightPlan;
}

const FlightPlanDisplay: React.FC<FlightPlanProps> = ({ flightPlan }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={2} key="callsign">
        <Typography variant="subtitle1">Callsign</Typography>
        <Typography variant="body1">{flightPlan.callsign}</Typography>
      </Grid>
      <Grid item xs={2} key="aircraft">
        <Typography variant="subtitle1">Aircraft</Typography>
        <Typography variant="body1">{flightPlan.aircraftType}</Typography>
      </Grid>
      <Grid item xs={2} key="squawk">
        <Typography variant="subtitle1">Squawk code</Typography>
        <Typography variant="body1">{flightPlan.squawk}</Typography>
      </Grid>
      <Grid item xs={2} key="departure">
        <Typography variant="subtitle1">Departure</Typography>
        <Typography variant="body1">{flightPlan.departure}</Typography>
      </Grid>
      <Grid item xs={2} key="arrival">
        <Typography variant="subtitle1">Arrival</Typography>
        <Typography variant="body1">{flightPlan.arrival}</Typography>
      </Grid>
      <Grid item xs={2} key="altitude">
        <Typography variant="subtitle1">Cruise altitude</Typography>
        <Typography variant="body1">{flightPlan.cruiseAltitude}</Typography>
      </Grid>
      <Grid item xs={12} key="route">
        <Typography variant="subtitle1">Route</Typography>
        <Typography variant="body1">{flightPlan.route}</Typography>
      </Grid>
    </Grid>
  );
};

export default FlightPlanDisplay;
