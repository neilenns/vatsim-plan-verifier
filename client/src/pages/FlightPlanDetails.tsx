import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import FlightPlan from "../components/FlightPlan";
import { useEffect } from "react";
import IFlightPlan from "../interfaces/IFlightPlan.mjs";
import IVerifyAllResult from "../interfaces/IVerifyAllResult.mts";
import VerifierResults from "../components/VerifierResults";
import { useLoaderData } from "react-router-dom";
import { Paper } from "@mui/material";

type LoaderProps = {
  flightPlan: IFlightPlan;
  verifyResults: IVerifyAllResult;
};

function FlightPlanDetails() {
  const { flightPlan, verifyResults } = useLoaderData() as LoaderProps;

  useEffect(() => {
    if (!flightPlan.callsign) {
      document.title = "Plan verifier";
    } else {
      document.title = `${flightPlan.callsign} (${flightPlan.departure}-${flightPlan.arrival})`;
    }
  }, [flightPlan]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Paper sx={{ padding: 1 }}>
            <FlightPlan flightPlan={flightPlan} verifierResults={verifyResults} />
          </Paper>
        </Grid>
        <Grid xs={12}>
          {(flightPlan?.verifierResultsCount ?? 0) > 0 && (
            <Paper sx={{ padding: 1 }}>
              <VerifierResults verifierResults={verifyResults?.results} flightPlan={flightPlan} />
            </Paper>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default FlightPlanDetails;
