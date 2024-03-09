import { Box } from "@mui/material";
import Markdown from "../components/Markdown";
import helpText from "../content/README.md?raw";

const Help = () => {
  return (
    <Box margin={2}>
      <Markdown>{helpText}</Markdown>
    </Box>
  );
};

export default Help;
