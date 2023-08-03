import { Box } from "@mui/material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import helpText from "../content/README.md?raw";
import { ReactNode } from "react";

const Help = () => {
  function CustomTable({ children }: { children: ReactNode }) {
    return <table className="markdownTable">{children}</table>;
  }

  return (
    <Box margin={2}>
      <ReactMarkdown
        children={helpText}
        remarkPlugins={[remarkGfm]}
        components={{ table: CustomTable }}
      />
    </Box>
  );
};

export default Help;
