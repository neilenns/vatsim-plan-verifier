import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { ReactNode } from "react";

type MarkdownProps = {
  children: string;
};

const Markdown = ({ children }: MarkdownProps) => {
  function CustomTable({ children }: { children: ReactNode }) {
    return <table className="markdownTable">{children}</table>;
  }

  function CustomBlockquote({ children }: { children: ReactNode }) {
    return <blockquote className="markdownBlockquote">{children}</blockquote>;
  }

  return (
    <ReactMarkdown
      children={children}
      remarkPlugins={[remarkGfm]}
      components={{ table: CustomTable, blockquote: CustomBlockquote }}
    />
  );
};

export default Markdown;
