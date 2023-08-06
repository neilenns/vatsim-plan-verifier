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

type LoaderProps = {
  flightPlan: IFlightPlan;
  verifyResults: IVerifyAllResult;
};

function FlightPlanDetails() {
  const [snackbar, setSnackbar] = useState<AlertSnackbarProps>(null);
  const { flightPlan, verifyResults } = useLoaderData() as LoaderProps;
  const actionData = useActionData() as PlanVerifyActionResult;
  const navigate = useNavigate();

  const handleSnackbarClose: AlertSnackBarOnClose = () => setSnackbar(null);

  useEffect(() => {
    if (actionData === undefined) {
      return;
    }

    if (actionData.success) {
      navigate(`../${actionData.data}`, { replace: true, relative: "path" });
    } else {
      setSnackbar({
        children: actionData.error,
        severity: "error",
      });
    }
  }, [actionData, navigate]);

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
      <AlertSnackbar {...snackbar} onClose={handleSnackbarClose} />
    </>
  );
}

export default FlightPlanDetails;
