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

interface ArticleProps {
  content: string;
}

export default function Article({ content }: ArticleProps) {
  return (
    <div className="prose lg:prose-xl ">
      <div className="content">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
