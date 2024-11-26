import { Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useActionData, useLoaderData, useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import FlightPlan from "../components/FlightPlan";
import VerifierResults from "../components/VerifierResults";
import { streamingModeState } from "../context/atoms";
import IFlightPlan from "../interfaces/IFlightPlan.mjs";
import IVerifyAllResult from "../interfaces/IVerifyAllResult.mts";
import { PlanDetailsLoaderResult } from "../services/flightPlanDetailsLoader.mts";
import { PlanVerifyActionResult } from "../services/flightPlanVerifyAction.mts";

const FlightPlanDetails = () => {
  const [flightPlan, setFlightPlan] = useState<IFlightPlan>({});
  const [verifyResults, setVerifyResults] = useState<IVerifyAllResult>();
  const loaderData = useLoaderData() as PlanDetailsLoaderResult;
  const actionData = useActionData() as PlanVerifyActionResult | undefined;
  const streamingMode = useRecoilValue(streamingModeState);
  const navigate = useNavigate();

  // Handles the submission response of the flight plan verification, and any
  // errors that may have occurred.
  useEffect(() => {
    if (!actionData) {
      return;
    }

    if (actionData.success) {
      // This is done here instead of via redirect() in the action so the replace
      // option can be set to stop polluting the brrwser history.
      navigate(`../${actionData.data}`, { replace: true, relative: "path" });
    } else {
      enqueueSnackbar(actionData.error, {
        variant: "error",
      });
    }
  }, [actionData, navigate]);

  // Handles loading the page with data returned from the loader, and displaying
  // any errors that may have occurred during the loading process.
  useEffect(() => {
    // Check for errors and show it in a snackbar.
    if (!loaderData.success) {
      document.title = "Vatsim plan verifier";
      enqueueSnackbar(loaderData.error, {
        variant: "error",
      });
      return;
    }

    // No errors so load the data and show it.
    const flightPlan = loaderData.data.flightPlan;
    setFlightPlan(loaderData.data.flightPlan);
    setVerifyResults(loaderData.data.verifyResults);

    // Set the window title to something nice if the necessary info is available,
    // but only if streaming mode isn't active.
    if (streamingMode || !flightPlan.callsign || !flightPlan.departure || !flightPlan.arrival) {
      document.title = "Vatsim plan verifier";
    } else {
      document.title = `${flightPlan.callsign} (${flightPlan.departure}-${flightPlan.arrival})`;
    }
  }, [loaderData, streamingMode]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Paper sx={{ padding: 1 }}>
            <FlightPlan flightPlan={flightPlan} verifierResults={verifyResults} />
          </Paper>
        </Grid>
        <Grid xs={12}>
          <VerifierResults verifierResults={verifyResults?.results} flightPlan={flightPlan} />
        </Grid>
      </Grid>
    </>
  );
};

export default FlightPlanDetails;
