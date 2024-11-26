import { Typography } from "@mui/material";
import debug from "debug";
import { isRouteErrorResponse, useRouteError } from "react-router";
import ErrorDisplay from "../components/ErrorDisplay";

const logger = debug("edct:ErrorPage");

// From https://github.com/remix-run/react-router/discussions/9628#discussioncomment-5555901
function errorMessage(error: unknown): string {
  if (isRouteErrorResponse(error)) {
    return `${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    return error.message;
  } else if (typeof error === "string") {
    return error;
  } else {
    logger(error);
    return "Unknown error";
  }
}

const ErrorPage = () => {
  const error = useRouteError();
  logger(error);

  return (
    <ErrorDisplay>
      <Typography align="center">
        Oops!
        <br />
        {errorMessage(error)}
      </Typography>
    </ErrorDisplay>
  );
};

export default ErrorPage;
