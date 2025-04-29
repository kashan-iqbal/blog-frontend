import { BlocksRenderer } from "@strapi/blocks-react-renderer";

interface ArticleProps {
  content: [];
}

export default function Article({ content }: ArticleProps) {
  return (
    <div className="prose lg:prose-xl ">
      <BlocksRenderer content={content} />;
    </div>
  );
}
