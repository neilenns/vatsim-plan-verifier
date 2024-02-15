import { Typography } from "@mui/material";
import ErrorDisplay from "../components/ErrorDisplay";

const PendingPage = () => {
  return (
    <ErrorDisplay>
      <Typography align="center">
        Your account is pending approval.
        <br />
        You&apos;ll receive an email once your account is activated.
      </Typography>
    </ErrorDisplay>
  );
};

export default PendingPage;
