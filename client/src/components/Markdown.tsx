import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { ReactNode } from "react";

interface MarkdownProps {
  children: string;
}

const Markdown = ({ children }: MarkdownProps) => {
  function CustomBlockquote({ children }: { children: ReactNode }) {
    return <blockquote className="markdownBlockquote">{children}</blockquote>;
  }

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        table: ({ children, style }) => <Table sx={{ ...style }}>{children}</Table>,
        thead: ({ children, style }) => <TableHead sx={{ ...style }}>{children}</TableHead>,
        tr: ({ children, style }) => <TableRow sx={{ ...style }}>{children}</TableRow>,
        td: ({ children, style }) => <TableCell sx={{ ...style }}>{children}</TableCell>,
        tbody: ({ children, style }) => <TableBody sx={{ ...style }}>{children}</TableBody>,
        blockquote: CustomBlockquote,
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;
