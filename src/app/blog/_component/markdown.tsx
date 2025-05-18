// import { BlocksRenderer } from "@strapi/blocks-react-renderer";

// interface ArticleProps {
//   content: [];
// }

// export default function Article({ content }: ArticleProps) {
//   return (
//     <div className="prose lg:prose-xl ">
//       <BlocksRenderer content={content} />;
//     </div>
//   );
// }
import ReactMarkdown from "react-markdown";
import { Components } from "react-markdown";

interface ArticleProps {
  content: string;
}

export default function Article({ content }: ArticleProps) {
  // Custom markdown component overrides
  const components: Components = {
    pre: ({ children }) => (
      <pre
        style={{
          overflowX: "auto",
          backgroundColor: "#f6f8fa",
          padding: "1rem",
          borderRadius: "5px",
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
          fontFamily: "monospace",
          overflowWrap: "break-word",
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
          }}
        >
          {children}
        </table>
      </div>
    ),
  };

  return (
    <div
      style={{
        maxWidth: "100%",
        overflowX: "auto",
        padding: "1rem",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          overflowX: "auto",
          wordWrap: "break-word",
          whiteSpace: "pre-wrap",
        }}
      >
        <ReactMarkdown components={components}>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
