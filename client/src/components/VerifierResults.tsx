import VerifierResultComponent from "./VerifierResult";
import { Grid, Paper } from "@mui/material";
import IVerifierResultDocument, { StatusValue } from "../interfaces/IVerifierResult.mts";
import IFlightPlan from "../interfaces/IFlightPlan.mts";
import useAppContext from "../context/AppContext";

interface VerifierResultsProps {
  verifierResults: IVerifierResultDocument[] | undefined;
  flightPlan: IFlightPlan;
}

const statusOrder: Record<StatusValue, number> = {
  Error: 0,
  Warning: 1,
  Ok: 2,
  Information: 3,
  CustomMessage: 4,
};

const VerifierResults = ({ verifierResults, flightPlan }: VerifierResultsProps) => {
  const { hideInformational } = useAppContext();

  // This method of sorting on multiple properties comes from
  // https://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields/46256174#46256174
  const filteredResults = verifierResults
    // Filter informational results unless hideInformational is true.
    ?.filter((result) => !hideInformational || result.status !== "Information")
    ?.sort((a, b) => statusOrder[a.status] - statusOrder[b.status] || a.priority - b.priority);

  return (
    filteredResults &&
    filteredResults.length > 0 && (
      <Paper sx={{ padding: 1 }}>
        <Grid container spacing={2}>
          {filteredResults.map((result, index) => (
            <Grid item xs={12} key={index}>
              <VerifierResultComponent verifierResult={result} flightPlan={flightPlan} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    )
  );
};

export default VerifierResults;
