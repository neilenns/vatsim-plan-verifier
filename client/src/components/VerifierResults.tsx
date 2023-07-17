import React from "react";
import VerifierResultComponent from "./VerifierResult";
import { Grid } from "@mui/material";
import IVerifierResultDocument from "../interfaces/IVerifierResultDocument.mts";

interface VerifierResultsProps {
  verifierResults: IVerifierResultDocument[];
}

const VerifierResults: React.FC<VerifierResultsProps> = ({
  verifierResults,
}) => {
  return (
    <Grid container spacing={2}>
      {verifierResults.map((result, index) => (
        <Grid item xs={12} key={index}>
          <VerifierResultComponent verifierResult={result} />
        </Grid>
      ))}
    </Grid>
  );
};

export default VerifierResults;
