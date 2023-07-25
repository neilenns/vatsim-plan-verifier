import { InputAdornment, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { Warning, Error, CheckCircle } from "@mui/icons-material";

interface StatusIndicatorProps {
  hasErrors?: boolean;
  hasWarnings?: boolean;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = (props) => {
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(props.hasErrors);
  const [hasWarnings, setHasWarnings] = useState<boolean | undefined>(props.hasWarnings);
  const theme = useTheme();

  useEffect(() => {
    setHasErrors(props.hasErrors);
    setHasWarnings(props.hasWarnings);
  }, [props.hasErrors, props.hasWarnings]);

  useEffect(() => {
    // This comment exists to shut up es-lint
  }, [theme]);

  if (hasWarnings === undefined && hasErrors === undefined) {
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
