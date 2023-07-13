import "./App.css";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

import FlightPlanEntryForm from "./components/FlightPlanEntry";
import { Typography } from "@mui/material";
import FlightPlanDisplay from "./components/FlightPlanDisplay";
import { useState } from "react";
import IFlightPlan from "./interfaces/IFlightPlan.mts";

const testFlightPlan = {
  callSign: "BAW123",
  aircraftType: "B738",
  squawk: "1234",
  departure: "EGLL",
  arrival: "EHAM",
  cruiseAltitude: "FL360",
  route: "DCT DET DCT",
} as IFlightPlan;

function App() {
  const [flightPlan, setFlightPlan] = useState<IFlightPlan>({} as IFlightPlan);

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Typography>Flight plan verifier</Typography>
      </Grid>
      <Grid xs={5}>
        <FlightPlanEntryForm
          onSubmit={() => {
            setFlightPlan(testFlightPlan);
          }}
        />
      </Grid>
      <Grid xs={7}>
        <FlightPlanDisplay flightPlan={flightPlan} />
      </Grid>
    </Grid>
  );
}

export default App;
