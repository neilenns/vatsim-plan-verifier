import "./App.css";
import Grid from "@mui/material/Unstable_Grid2/Grid2"; // Grid version 2

import { Typography } from "@mui/material";
import FlightPlan from "./components/FlightPlan";
import { useState } from "react";
import IFlightPlan from "./interfaces/IFlightPlan.mjs";
import IVerifyAllResult from "./interfaces/IVerifyAllResult.mts";
import VerifierResults from "./components/VerifierResults";

function App() {
  const [flightPlan, setFlightPlan] = useState<IFlightPlan>({} as IFlightPlan);
  const [verifyResults, setVerifyResults] = useState<IVerifyAllResult | null>(null);

  const handleReset = () => {
    setVerifyResults({} as IVerifyAllResult);
    setFlightPlan({} as IFlightPlan);
  };

  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Typography>Flight plan verifier</Typography>
      </Grid>
      <Grid xs={12}>
        <FlightPlan
          verifierResults={verifyResults}
          onStoreFlightPlan={(flightPlan) => {
            setFlightPlan(flightPlan);
          }}
          onVerify={(results) => {
            setVerifyResults(results);
          }}
          onReset={handleReset}
          flightPlan={flightPlan}
        />
      </Grid>
      <Grid xs={12}>
        <VerifierResults verifierResults={verifyResults?.results} flightPlan={flightPlan} />
      </Grid>
    </Grid>
  );
}

export default App;
