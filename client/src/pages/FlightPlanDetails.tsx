import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import FlightPlan from "../components/FlightPlan";
import { useEffect, useState } from "react";
import IFlightPlan from "../interfaces/IFlightPlan.mjs";
import IVerifyAllResult from "../interfaces/IVerifyAllResult.mts";
import VerifierResults from "../components/VerifierResults";
import { useActionData, useLoaderData, useNavigate } from "react-router-dom";
import AlertSnackbar, {
  AlertSnackBarOnClose,
  AlertSnackbarProps,
} from "../components/AlertSnackbar";
import { Paper } from "@mui/material";
import { PlanVerifyActionResult } from "../services/flightPlanVerifyAction.mts";
import { PlanDetailsLoaderResult } from "../services/flightPlanDetailsLoader.mts";

function FlightPlanDetails() {
  const [snackbar, setSnackbar] = useState<AlertSnackbarProps>(null);
  const [flightPlan, setFlightPlan] = useState<IFlightPlan>({});
  const [verifyResults, setVerifyResults] = useState<IVerifyAllResult>();
  const loaderData = useLoaderData() as PlanDetailsLoaderResult;
  const actionData = useActionData() as PlanVerifyActionResult;
  const navigate = useNavigate();

  const handleSnackbarClose: AlertSnackBarOnClose = () => setSnackbar(null);

  // Handles the submission response of the flight plan verification, and any
  // errors that may have occurred.
  useEffect(() => {
    if (actionData === undefined) {
      return;
    }

    if (actionData.success) {
      // This is done here instead of via redirect() in the action so the replace
      // option can be set to stop polluting the brrwser history.
      navigate(`../${actionData.data}`, { replace: true, relative: "path" });
    } else {
      setSnackbar({
        children: actionData.error,
        severity: "error",
      });
    }
  }, [actionData, navigate]);

  // Handles loading the page with data returned from the loader, and displaying
  // any errors that may have occurred during the loading process.
  useEffect(() => {
    if (loaderData === undefined) {
      return;
    }

    // Check for errors and show it in a snackbar.
    if (!loaderData.success) {
      setSnackbar({
        children: loaderData.error,
        severity: "error",
      });
      return;
    }

    // No errors so load the data and show it.
    const flightPlan = loaderData.data.flightPlan;
    setFlightPlan(loaderData.data.flightPlan ?? {});
    setVerifyResults(loaderData.data.verifyResults);

    // Set the window title to something nice if the necessary info is available.
    if (!flightPlan.callsign || !flightPlan.departure || !flightPlan.arrival) {
      document.title = "Plan verifier";
    } else {
      document.title = `${flightPlan.callsign} (${flightPlan.departure}-${flightPlan.arrival})`;
    }
  }, [loaderData]);

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
      <AlertSnackbar {...snackbar} onClose={handleSnackbarClose} />
    </>
  );
}

export default FlightPlanDetails;
