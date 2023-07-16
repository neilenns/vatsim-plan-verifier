import "./App.css";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

import FlightPlanEntryForm from "./components/FlightPlanEntry";
import { Typography } from "@mui/material";
import FlightPlanDisplay from "./components/FlightPlanDisplay";
import { useState } from "react";
import IFlightPlan from "./interfaces/IFlightPlan.mjs";
import { storeFlightPlan } from "./db/flightPlan.mts";

function App() {
  const [flightPlan, setFlightPlan] = useState<IFlightPlan>({} as IFlightPlan);

  function handleSubmit(flightPlan: IFlightPlan) {
    storeFlightPlan(flightPlan)
      .then(() => {
        setFlightPlan(flightPlan);
      })
      .catch((error: Error) => {
        console.log(error.message);
      });
  }

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Typography>Flight plan verifier</Typography>
      </Grid>
      <Grid xs={5}>
        <FlightPlanEntryForm onSubmit={handleSubmit} />
      </Grid>
      <Grid xs={7}>
        <FlightPlanDisplay flightPlan={flightPlan} />
      </Grid>
    </Grid>
  );
}

export default App;
