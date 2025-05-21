import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Components } from "react-markdown";

interface ArticleProps {
  content: string;
}

export default function Article({ content }: ArticleProps) {
  const components: Components = {
    h1: ({ children }) => (
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          margin: "1.5rem 0 1rem",
        }}
      >
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2
        style={{
          fontSize: "1.75rem",
          fontWeight: "bold",
          margin: "1.25rem 0 1rem",
        }}
      >
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          margin: "1rem 0 0.75rem",
        }}
      >
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4
        style={{
          fontSize: "1.25rem",
          fontWeight: "bold",
          margin: "1rem 0 0.5rem",
        }}
      >
        {children}
      </h4>
    ),
    p: ({ children }) => (
      <p style={{ marginBottom: "1rem", lineHeight: "1.6" }}>{children}</p>
    ),
    ul: ({ children }) => (
      <ul
        style={{
          paddingLeft: "1.5rem",
          marginBottom: "1rem",
          listStyleType: "disc",
        }}
      >
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol
        style={{
          paddingLeft: "1.5rem",
          marginBottom: "1rem",
          listStyleType: "decimal",
        }}
      >
        {children}
      </ol>
    ),
    li: ({ children }) => (
      <li style={{ marginBottom: "0.5rem" }}>{children}</li>
    ),
    blockquote: ({ children }) => (
      <blockquote
        style={{
          borderLeft: "4px solid #ccc",
          paddingLeft: "1rem",
          color: "#666",
          fontStyle: "italic",
          margin: "1rem 0",
        }}
      >
        {children}
      </blockquote>
    ),
    pre: ({ children }) => (
      <pre
        style={{
          overflowX: "auto",
          backgroundColor: "#282c34",
          color: "#f8f8f2",
          padding: "1rem",
          borderRadius: "5px",
          margin: "1.5rem 0",
        }}
      >
        {children}
      </pre>
    ),
    code: ({
      inline,
      className,
      children,
      ...props
    }: {
      inline?: boolean;
      className?: string;
      children?: React.ReactNode;
    }) => (
      <code
        style={{
          backgroundColor: inline ? "#f0f0f0" : "transparent",
          padding: inline ? "0.2rem 0.4rem" : undefined,
          borderRadius: "3px",
          fontFamily: `"Fira Code", "Source Code Pro", Menlo, Consolas, Monaco, monospace`,
          fontSize: "0.95rem",
        }}
        className={className}
        {...props}
      >
        {children}
      </code>
    ),
    table: ({ children }) => (
      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            minWidth: "400px",
            marginTop: "1rem",
            marginBottom: "1rem",
          }}
        >
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th
        style={{
          border: "1px solid #ddd",
          padding: "8px",
          backgroundColor: "#f2f2f2",
          textAlign: "left",
        }}
      >
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td
        style={{
          border: "1px solid #ddd",
          padding: "8px",
        }}
      >
        {children}
      </td>
    ),
  };

  return (
    <div
      style={{
        maxWidth: "100%",
        overflowX: "auto",
        padding: "1rem",
        fontFamily: `"Inter", "Helvetica Neue", Arial, sans-serif`,
        lineHeight: 1.6,
        fontSize: "1rem",
        color: "#333",
      }}
    >
      <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
