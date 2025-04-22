import Image from "next/image";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Components } from "react-markdown";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

interface ArticleProps {
  content: string;
}

export default function Article({ content }: ArticleProps) {
  return (
    <div className="prose lg:prose-xl ">
      <BlocksRenderer content={content} />;
    </div>
  );
}

// export default function Article({ content }: ArticleProps) {

//   const components: Components = {
//     img: ({ node, ...props }) => (
//       // `alt` is optional so we provide a fallback
//       <Image
//         className="rounded-md shadow-md"
//         alt={props.alt || "Markdown image"}
//         width={800}
//         height={600}
//         {...props}
//       />
//     ),
//     code: ({ inline, className, children, ...props }) => {
//       return !inline ? (
//         <pre className="bg-gray-800 text-white p-4 rounded overflow-auto">
//           <code className={className} {...props}>
//             {children}
//           </code>
//         </pre>
//       ) : (
//         <code className="bg-gray-100 px-1 py-0.5 rounded">{children}</code>
//       );
//     },
//   };

//   return (
//     <div className="prose prose-lg dark:prose-invert max-w-none">
//       <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
//         {content}
//       </ReactMarkdown>
//     </div>
//   );
// }
