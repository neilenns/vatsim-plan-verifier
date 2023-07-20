import "./App.css";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

import FlightPlanEntryForm from "./components/FlightPlanEntry";
import { Typography } from "@mui/material";
import FlightPlanDisplay from "./components/FlightPlanDisplay";
import { useState } from "react";
import IFlightPlan from "./interfaces/IFlightPlan.mjs";
import IVerifyAllResult from "./interfaces/IVerifyAllResult.mts";
import VerifierResults from "./components/VerifierResults";

function App() {
  const [flightPlan, setFlightPlan] = useState<IFlightPlan>({} as IFlightPlan);
  const [verifyResults, setVerifyResults] = useState<IVerifyAllResult | null>(null);

  function handleSubmit(flightPlan: IFlightPlan) {
    setFlightPlan(flightPlan);
  }

  function handleVerify(results: IVerifyAllResult) {
    setVerifyResults(results);
    console.log(results);
  }

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Typography>Flight plan verifier</Typography>
      </Grid>
      <Grid xs={5}>
        <FlightPlanEntryForm onSubmit={handleSubmit} onVerify={handleVerify} />
      </Grid>
      <Grid xs={7}>
        <FlightPlanDisplay verifierResults={verifyResults} flightPlan={flightPlan} />
      </Grid>
      <Grid xs={12}>
        <VerifierResults verifierResults={verifyResults?.results} flightPlan={flightPlan} />
      </Grid>
    </Grid>
  );
}

export default App;
