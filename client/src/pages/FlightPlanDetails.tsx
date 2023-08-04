import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import FlightPlan from "../components/FlightPlan";
import { useEffect, useState } from "react";
import IFlightPlan from "../interfaces/IFlightPlan.mjs";
import IVerifyAllResult from "../interfaces/IVerifyAllResult.mts";
import VerifierResults from "../components/VerifierResults";
import { useActionData, useLoaderData } from "react-router-dom";
import { Alert, IconButton, Paper, Snackbar } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { snackbarAutoHideDuration } from "../configs/planVerifierServer.mts";

type LoaderProps = {
  flightPlan: IFlightPlan;
  verifyResults: IVerifyAllResult;
};

type ActionResponse = {
  error: string;
};

function FlightPlanDetails() {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "error" | "success" | "info" | "warning"
  >("info"); // eslint-disable-line @typescript-eslint/no-unused-vars
  const { flightPlan, verifyResults } = useLoaderData() as LoaderProps;
  const data = useActionData() as ActionResponse;

  const handleSnackbarClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (data?.error) {
      setSnackbarMessage(data.error);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  }, [data]);

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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={snackbarAutoHideDuration}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}

export default FlightPlanDetails;
