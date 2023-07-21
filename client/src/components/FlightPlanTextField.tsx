import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

const getBorderColorByStatus = (hasErrors?: boolean, hasWarnings?: boolean) => {
  if (hasErrors) {
    return "red";
  } else if (hasWarnings) {
    return "#9daa3d";
  } else if (!(hasErrors === undefined) && !(hasWarnings === undefined)) {
    return "green";
  }
};

interface FlightPlanTextFieldProps {
  id: string;
  label: string;
  value: string;
  hasErrors?: boolean;
  hasWarnings?: boolean;
  trim?: boolean;
  onPaste: (text: string) => boolean;
  onChange: (text: string) => void;
}

const FlightPlanTextField: React.FC<FlightPlanTextFieldProps> = (props) => {
  const [id, setId] = useState<string>(props.id);
  const [label, setLabel] = useState<string>(props.label);
  const [value, setValue] = useState<string>(props.value);
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(props.hasErrors);
  const [hasWarnings, setHasWarnings] = useState<boolean | undefined>(props.hasWarnings);
  const [trim, setTrim] = useState<boolean>(props.trim ?? false);

  useEffect(() => {
    setId(props.id);
    setLabel(props.label);
    setValue(props.value);
    setTrim(props.trim ?? false);
    setHasErrors(props.hasErrors);
    setHasWarnings(props.hasWarnings);
  }, [props.id, props.label, props.value, props.hasErrors, props.hasWarnings, props.trim]);

  const handlePaste = (event: React.ClipboardEvent<Element>) => {
    const isValidFlightPlan = props.onPaste(event.clipboardData.getData("Text"));
    if (isValidFlightPlan) {
      event.preventDefault();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (trim) {
      event.target.value = event.target.value.trim();
    }

    setValue(event.target.value);
    props.onChange(event.target.value);
  };

  return (
    <TextField
      fullWidth
      id={id}
      label={label}
      value={value ?? ""}
      InputLabelProps={{ shrink: value ? true : false }}
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
