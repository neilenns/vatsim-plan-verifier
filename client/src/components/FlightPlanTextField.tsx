import { ContentCopy as ContentCopyIcon } from "@mui/icons-material";
import { FormGroup, IconButton, StandardTextFieldProps, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
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

type FlightPlanTextFieldProps = {
  value: string;
  hasErrors?: boolean;
  hasWarnings?: boolean;
  trim?: boolean;
  canCopy?: boolean;
  onPaste: (text: string) => boolean;
  onChange: (text: string) => void;
} & Omit<StandardTextFieldProps, "onPaste" | "onChange">;

const FlightPlanTextField = ({
  value: propValue,
  hasErrors: propHasErrors,
  hasWarnings: propHasWarnings,
  trim,
  canCopy,
  onPaste,
  onChange,
  ...textFieldProps
}: FlightPlanTextFieldProps) => {
  const [value, setValue] = useState<string>(propValue);
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(propHasErrors);
  const [hasWarnings, setHasWarnings] = useState<boolean | undefined>(propHasWarnings);

  useEffect(() => {
    setValue(propValue);
    setHasErrors(propHasErrors);
    setHasWarnings(propHasWarnings);
  }, [propHasErrors, propHasWarnings, propValue]);

  const handlePaste = (event: React.ClipboardEvent) => {
    const isValidFlightPlan = onPaste(event.clipboardData.getData("Text"));
    if (isValidFlightPlan) {
      event.preventDefault();
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (trim) {
      event.target.value = event.target.value.trim();
    }

    setValue(event.target.value);
    onChange(event.target.value);
  };

  const handleCopy = () => {
    void navigator.clipboard.writeText(value);
  };

  return (
    <FormGroup row>
      <TextField
        {...textFieldProps}
        fullWidth
        value={value ?? ""}
        InputLabelProps={{ shrink: value ? true : false }}
        InputProps={{
          endAdornment: (
            <>
              <StatusIndicator hasErrors={hasErrors} hasWarnings={hasWarnings} />
              {canCopy && (
                <IconButton
                  onClick={handleCopy}
                  size="small"
                  aria-label="Copy text"
                  sx={{ paddingTop: 0, paddingBottom: 0, paddingRight: 0 }}
                >
                  <ContentCopyIcon />
                </IconButton>
              )}
            </>
          ),
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
    </FormGroup>
  );
};

export default FlightPlanTextField;
