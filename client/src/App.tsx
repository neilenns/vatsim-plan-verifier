import "./App.css";
import Grid from "@mui/material/Unstable_Grid2/Grid2"; // Grid version 2

import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import FlightPlan from "./components/FlightPlan";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (!flightPlan.callsign) {
      document.title = "Plan verifier";
    } else {
      document.title = `${flightPlan.callsign} (${flightPlan.departure}-${flightPlan.arrival})`;
    }
  }, [flightPlan]);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="absolute"
          sx={{
            margin: 0,
            left: 0,
            right: 0,
          }}
        >
          <Typography variant="h6" sx={{ my: 2, marginLeft: 1 }}>
            Plan Verifier
          </Typography>
        </AppBar>
        <Toolbar />
      </Box>
      <Grid container spacing={2}>
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
    </>
  );
}

export default App;
