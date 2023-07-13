import React, { useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";

interface FlightPlanProps {
  onSubmit: (rawFlightPlan: string) => void;
}

const FlightPlanEntryForm: React.FC<FlightPlanProps> = ({ onSubmit }) => {
  const [rawFlightPlan, setRawFlightPlan] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(rawFlightPlan);
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
            style={{ width: "100%", flex: 1 }}
          />
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
        Verify
      </Button>
    </Box>
  );
};

export default FlightPlanEntryForm;
