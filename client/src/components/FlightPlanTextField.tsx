import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import StatusIndicator from "./StatusIndicator";

const getBorderColorByStatus = (hasErrors?: boolean, hasWarnings?: boolean) => {
  if (hasErrors) {
    return "red";
  } else if (hasWarnings) {
    return "gold";
  } else if (!(hasErrors === undefined) && !(hasWarnings === undefined)) {
    return "green";
  }
};

interface FlightPlanTextFieldProps {
  id: string;
  label: string;
  name: string;
  value: string;
  hasErrors?: boolean;
  hasWarnings?: boolean;
  trim?: boolean;
  onPaste: (text: string) => boolean;
  onChange: (text: string) => void;
}

const FlightPlanTextField: React.FC<FlightPlanTextFieldProps> = (props) => {
  const [value, setValue] = useState<string>(props.value);
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(props.hasErrors);
  const [hasWarnings, setHasWarnings] = useState<boolean | undefined>(props.hasWarnings);

  useEffect(() => {
    setValue(props.value);
    setHasErrors(props.hasErrors);
    setHasWarnings(props.hasWarnings);
  }, [props.value, props.hasErrors, props.hasWarnings]);

  const handlePaste = (event: React.ClipboardEvent<Element>) => {
    const isValidFlightPlan = props.onPaste(event.clipboardData.getData("Text"));
    if (isValidFlightPlan) {
      event.preventDefault();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (props.trim) {
      event.target.value = event.target.value.trim();
    }

    setValue(event.target.value);
    props.onChange(event.target.value);
  };

  return (
    <TextField
      fullWidth
      id={props.id}
      label={props.label}
      name={props.name}
      value={value ?? ""}
      InputLabelProps={{ shrink: value ? true : false }}
      InputProps={{
        endAdornment: <StatusIndicator hasErrors={hasErrors} hasWarnings={hasWarnings} />,
      }}
      onPaste={handlePaste}
      onChange={handleChange}
      multiline
      required
      // Setting the colour of the outline based on the status of the field
      // when the field does NOT have focus is a pain. This comes from
      // https://smartdevpreneur.com/override-textfield-border-color-in-material-ui/
      sx={{
        "& .MuiOutlinedInput-root": {
          "& fieldset": {
            borderColor: getBorderColorByStatus(hasErrors, hasWarnings),
          },
        },
      }}
    />
  );
};

export default FlightPlanTextField;
