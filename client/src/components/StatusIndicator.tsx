import { InputAdornment } from "@mui/material";
import { useEffect, useState } from "react";
import { Warning, Error, CheckCircle } from "@mui/icons-material";

interface StatusIndicatorProps {
  hasErrors?: boolean;
  hasWarnings?: boolean;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = (props) => {
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(props.hasErrors);
  const [hasWarnings, setHasWarnings] = useState<boolean | undefined>(props.hasWarnings);

  useEffect(() => {
    setHasErrors(props.hasErrors);
    setHasWarnings(props.hasWarnings);
  }, [props.hasErrors, props.hasWarnings]);

  if (hasWarnings === undefined && hasErrors === undefined) {
    return <></>;
  }

  if (hasErrors) {
    return (
      <InputAdornment position="end">
        <Error sx={{ color: "red" }} />
      </InputAdornment>
    );
  }

  if (hasWarnings) {
    return (
      <InputAdornment position="end">
        <Warning sx={{ color: "gold" }} />
      </InputAdornment>
    );
  }

  return (
    <InputAdornment position="end">
      <CheckCircle sx={{ color: "green" }} />
    </InputAdornment>
  );
};

export default StatusIndicator;
