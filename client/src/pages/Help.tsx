import { Box } from "@mui/material";
import ReactMarkdown from "react-markdown";

import helpText from "../content/README.md?raw";

const Help = () => {
  return (
    <Box margin={2}>
      <ReactMarkdown children={helpText} />
    </Box>
  );
};

export default Help;
