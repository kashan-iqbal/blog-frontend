import { Metadata } from "next";
import { GetBlogDetail } from "../Hook/ApiHook";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Article from "../_component/markdown";
import RelatedBlog from "../_component/RelatedBlog";
import BlogFeatures from "../_component/BlogFeature";
import { Tag } from "lucide-react";
import { notFound } from "next/navigation";

// Extend dayjs with plugin
dayjs.extend(relativeTime);

// Define page props
interface PageProps {
  params: Promise<{ slug: string }>;
}

// --- Static Params for SSG ---
export async function generateStaticParams() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs?fields=slug`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
        next: { revalidate: 60 }, // Revalidate every 60 seconds
      }
    );
    const { data } = await res.json();

    return data.map((blog: { slug: string }) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// --- Metadata ---
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const post = await GetBlogDetail(slug);

    const seo = post?.data?.[0]?.seo?.[0];

    if (!seo) {
      return {
        title: "Blog Not Found",
        description: "This blog post could not be found.",
      };
    }

    return {
      title: seo.metaTitle ?? "Default Blog Title",
      description: seo.metaDescription ?? "Default Description",
      keywords: seo.keywords ?? "",
      alternates: {
        canonical:
          seo.canonicalURL ??
          `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog/${slug}`,
      },
      openGraph: {
        title: seo.metaTitle,
        description: seo.metaDescription,
        url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog/${slug}`,
        images: [
          {
            url:
              seo.metaImage?.url ??
              `https://og-image.vercel.app/Blog.png?theme=light&md=1&fontSize=100px`,
            width: 1200,
            height: 630,
          },
        ],
      },
    };
  } catch (error) {
    console.error("Metadata generation error:", error);
    return {
      title: "Blog Error",
      description: "There was a problem loading the blog metadata.",
    };
  }
}

// --- Page Component ---
export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;

  try {
    const data = await GetBlogDetail(slug);
    const blog = data?.data?.[0];

    if (!blog) return notFound();

    const {
      title,
      content,
      createdAt,
      auther,
      tags,
      slug: blogSlug,
      cover_image,
      seo,
      catageory,
    } = blog;
    return (
      <div className="bg-gradient-to-b from-indigo-50 to-white min-h-screen pb-12 mt-18">
        {/* Structured Data for SEO */}
        {seo?.[0]?.structuredData && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(seo[0].structuredData),
            }}
          />
        )}

        <BlogFeatures />

        <div className="container mx-auto max-w-4xl px-4">
          {/* Hero Image */}
          <div className="relative w-full h-80 mb-6">
            <Image
              src={cover_image.url || cover_image?.formats.thumbnail.url}
              alt={title ?? "Blog post"}
              fill
              className="rounded-2xl object-cover"
              // sizes="(max-width: 768px) 100vw, 800px"
              priority={true}
            />
          </div>

          {/* Author Info */}
          <div className="flex items-center mt-6 mb-6 bg-gray-100 w-fit rounded-3xl pr-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
              <Image
                src={auther?.profile_image?.url ?? "/placeholder-author.jpg"}
                alt={auther?.name ?? "Author"}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">
                {auther?.name ?? "Unknown Author"}
              </h3>
              <p className="text-sm text-gray-500">
                Posted {createdAt ? dayjs(createdAt).fromNow() : "Unknown date"}
              </p>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
            {title}
          </h1>

          {/* Tags */}
          {tags?.length > 0 && (
            <div className="flex items-center mb-3">
              <Tag size={14} className="text-indigo-600 mr-2" />
              <div className="flex flex-wrap gap-1">
                {tags.map((tag: { tag: string }, index: number) => (
                  <a
                    key={index}
                    href={`/tags/${tag.tag}`}
                    className="text-blue-600 bg-blue-50 border-blue-200 text-xs font-medium px-2 py-1 rounded border hover:shadow-sm transition-all"
                  >
                    #{tag.tag}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Article Content */}
          <article className="bg-white shadow-md rounded-lg p-6 md:p-8 mb-8">
            <Article content={content} />
          </article>

          {/* Related Blogs */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <RelatedBlog catageory={catageory} slug={blogSlug} />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error rendering blog post:", error);
    notFound();
  }
}
