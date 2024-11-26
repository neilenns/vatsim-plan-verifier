import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router";
import Markdown from "../components/Markdown";
import { QuickReferenceLoaderResult } from "../services/quickReferenceLoader.mts";

const QuickReference = () => {
  const { key } = useParams();
  const [quickReference, setQuickReference] = useState("");
  const result = useLoaderData() as QuickReferenceLoaderResult;
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
    result.success && (
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
              {result.data.entries.map((entry) => {
                return (
                  <MenuItem key={entry.key} value={entry.key}>
                    {entry.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
        <Markdown>{result.data.markdown}</Markdown>
      </Box>
    )
  );
};

export default QuickReference;
