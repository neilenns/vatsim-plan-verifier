import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import Markdown from "../components/Markdown";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const QuickReference = () => {
  const { key } = useParams();
  const [quickReference, setQuickReference] = useState("");
  const navigate = useNavigate();

  const handleChange = (event: SelectChangeEvent) => {
    navigate(key ? `../${event.target.value}` : event.target.value, {
      replace: true,
      relative: "path",
    });
  };

  useEffect(() => {
    setQuickReference(key ?? "");
  }, [key]);

  return (
    <Box margin={2}>
      <Box sx={{ minWidth: 120, maxWidth: 200 }}>
        <FormControl fullWidth>
          <InputLabel id="quickreference-select-label">Quick reference</InputLabel>
          <Select
            labelId="quickreference-select-label"
            id="quickreference-select"
            value={quickReference}
            label="Quick reference"
            onChange={handleChange}
          >
            <MenuItem value={"helicopters"}>Helicopters</MenuItem>
            <MenuItem value={"military"}>Military</MenuItem>
            <MenuItem value={"equipmentsuffixes"}>Equipment suffixes</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Markdown>Select a quick reference</Markdown>
    </Box>
  );
};

export default QuickReference;
