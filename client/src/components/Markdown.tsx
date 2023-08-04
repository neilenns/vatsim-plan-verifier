import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { ReactNode } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

type MarkdownProps = {
  children: string;
};

const Markdown = ({ children }: MarkdownProps) => {
  function CustomBlockquote({ children }: { children: ReactNode }) {
    return <blockquote className="markdownBlockquote">{children}</blockquote>;
  }

  return (
    <ReactMarkdown
      children={children}
      remarkPlugins={[remarkGfm]}
      components={{
        table: ({ children }) => <Table>{children}</Table>,
        thead: ({ children }) => <TableHead>{children}</TableHead>,
        tr: ({ children }) => <TableRow>{children}</TableRow>,
        td: ({ children }) => <TableCell>{children}</TableCell>,
        tbody: ({ children }) => <TableBody>{children}</TableBody>,
        blockquote: CustomBlockquote,
      }}
    />
  );
};

export default Markdown;
