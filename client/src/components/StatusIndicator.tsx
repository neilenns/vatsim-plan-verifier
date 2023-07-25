import { InputAdornment, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Warning, Error, CheckCircle } from "@mui/icons-material";

// This component can take either hasErrors and hasWarnings from VerifyAllResults
// or a status from a VerifyResult. If it has a status, it will override the other two
// values.
interface StatusIndicatorProps {
  hasErrors?: boolean;
  hasWarnings?: boolean;
  status?: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = (props) => {
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(props.hasErrors);
  const [hasWarnings, setHasWarnings] = useState<boolean | undefined>(props.hasWarnings);
  const theme = useTheme();

  useEffect(() => {
    const status = props.status?.toLowerCase();

    if (status === "ok") {
      setHasErrors(false);
      setHasWarnings(false);
    } else if (status === "warning") {
      setHasErrors(false);
      setHasWarnings(true);
    } else if (status === "error") {
      setHasErrors(true);
      setHasWarnings(false);
    } else {
      setHasErrors(props.hasErrors);
      setHasWarnings(props.hasWarnings);
    }
  }, [props]);

  // Redraw when the theme changes
  useEffect(() => {
    // This comment exists to shut up es-lint
  }, [theme]);

  if (hasWarnings === undefined && hasErrors === undefined && status === undefined) {
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

  return (
    <InputAdornment position="end">
      <CheckCircle color="success" />
    </InputAdornment>
  );
};

export default StatusIndicator;
