import { CheckCircle, Error, Info, Warning } from "@mui/icons-material";
import { InputAdornment, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

// This component can take either hasErrors and hasWarnings from VerifyAllResults
// or a status from a VerifyResult. If it has a status, it will override the other two
// values.
interface StatusIndicatorProps {
  hasErrors?: boolean;
  hasWarnings?: boolean;
  hasCustomMessage?: boolean;
  status?: string;
}

const StatusIndicator = (props: StatusIndicatorProps) => {
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(props.hasErrors);
  const [hasWarnings, setHasWarnings] = useState<boolean | undefined>(props.hasWarnings);
  const [hasCustomMessage, setHasCustomMessage] = useState<boolean | undefined>(
    props.status === "custommessage"
  );
  const theme = useTheme();

  useEffect(() => {
    const status = props.status?.toLowerCase();

    if (status === "ok") {
      setHasErrors(false);
      setHasWarnings(false);
      setHasCustomMessage(false);
    } else if (status === "warning") {
      setHasErrors(false);
      setHasWarnings(true);
      setHasCustomMessage(false);
    } else if (status === "error") {
      setHasErrors(true);
      setHasWarnings(false);
      setHasCustomMessage(false);
    } else if (status === "custommessage") {
      setHasErrors(false);
      setHasWarnings(false);
      setHasCustomMessage(true);
    } else {
      setHasErrors(props.hasErrors);
      setHasWarnings(props.hasWarnings);
      setHasCustomMessage(props.hasCustomMessage);
    }
  }, [props]);

  // Redraw when the theme changes
  useEffect(() => {
    // This comment exists to shut up es-lint
  }, [theme]);

  if (hasWarnings === undefined && hasErrors === undefined && hasCustomMessage === undefined) {
    return <></>;
  }

  if (hasErrors) {
    return (
      <InputAdornment position="end">
        <Error color="error" />
      </InputAdornment>
    );
  }

  if (hasWarnings) {
    return (
      <InputAdornment position="end">
        <Warning color="warning" />
      </InputAdornment>
    );
  }

  if (hasCustomMessage) {
    return (
      <InputAdornment position="end">
        <Info color="info" />
      </InputAdornment>
    );
  }

  return (
    <InputAdornment position="end">
      <CheckCircle color="success" />
    </InputAdornment>
  );
};

export default StatusIndicator;
