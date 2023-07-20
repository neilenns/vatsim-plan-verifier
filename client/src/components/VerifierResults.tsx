import React from "react";
import VerifierResultComponent from "./VerifierResult";
import { Grid } from "@mui/material";
import IVerifierResultDocument, { StatusValue } from "../interfaces/IVerifierResult.mts";
import IFlightPlan from "../interfaces/IFlightPlan.mts";

interface VerifierResultsProps {
  verifierResults: IVerifierResultDocument[] | undefined;
  flightPlan: IFlightPlan;
}

const statusOrder: Record<StatusValue, number> = {
  Error: 0,
  Warning: 1,
  Ok: 2,
  Information: 3,
};

const VerifierResults: React.FC<VerifierResultsProps> = ({ verifierResults, flightPlan }) => {
  const filteredResults = verifierResults
    ?.filter((result) => result.status !== "Information")
    ?.sort((a, b) => statusOrder[b.status] - statusOrder[a.status])
    ?.sort((a, b) => b.priority - a.priority);

  return (
    filteredResults && (
      <Grid container spacing={2}>
        {filteredResults.map((result, index) => (
          <Grid item xs={12} key={index}>
            <VerifierResultComponent verifierResult={result} flightPlan={flightPlan} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default VerifierResults;
