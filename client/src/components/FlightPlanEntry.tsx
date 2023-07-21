import React, { useState } from "react";
import { Box, Grid, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import IFlightPlan from "../interfaces/IFlightPlan.mjs";
import { parseFlightPlan } from "../utils/flightPlanParser";
import { storeFlightPlan } from "../db/flightPlan.mts";
import { runAllVerifiers } from "../db/runAllVerifiers.mts";
import IVerifyAllResult from "../interfaces/IVerifyAllResult.mts";

interface FlightPlanProps {
  onSubmit: (flightPlan: IFlightPlan) => void;
  onVerify: (result: IVerifyAllResult) => void;
}

const FlightPlanEntryForm: React.FC<FlightPlanProps> = ({ onSubmit, onVerify }) => {
  const [rawFlightPlan, setRawFlightPlan] = useState("");
  const [submitErrorText, setSubmitErrorText] = useState("");
  const [verifying, setVerifying] = React.useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const flightPlan = parseFlightPlan(rawFlightPlan);

    setSubmitErrorText("");
    setVerifying(true);

    storeFlightPlan(flightPlan)
      .then((storedFlightPlan) => {
        onSubmit(storedFlightPlan);

        runAllVerifiers(storedFlightPlan)
          .then((result) => {
            onVerify(result);
          })
          .catch((error: Error) => {
            setSubmitErrorText(error.message);
          });
      })
      .catch((error: Error) => {
        setSubmitErrorText(error.message);
      })
      .finally(() => {
        setVerifying(false);
      });
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRawFlightPlan(event.target.value);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Enter a flight plan"
            multiline
            rows={4}
            value={rawFlightPlan}
            onChange={handleTextChange}
            error={submitErrorText !== ""}
            helperText={submitErrorText}
            style={{ width: "100%", flex: 1 }}
          />
        </Grid>
      </Grid>
      <LoadingButton
        loading={verifying}
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2, width: "25%" }}
      >
        Verify
      </LoadingButton>
    </Box>
  );
};

export default FlightPlanEntryForm;
