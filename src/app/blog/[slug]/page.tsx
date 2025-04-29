import { type Metadata } from "next";
import { GetBlogDetail } from "../Hook/ApiHook";
import Image from "next/image";
import dayjs from "dayjs";
import Article from "../_component/markdown";
import relativeTime from "dayjs/plugin/relativeTime";
import RelatedBlog from "../_component/RelatedBlog";
import BlogFeatures from "../_component/BlogFeature";
import { Tag } from "lucide-react";
import { notFound } from "next/navigation";

// Extend dayjs with relative time
dayjs.extend(relativeTime);

// Define props interface
interface Props {
  params: Promise<{ slug?: string }>;
}

// Use generateStaticParams to pre-render all blog pages
export async function generateStaticParams() {
  try {
    const { data } = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs?fields=slug`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
      }
    ).then((res) => res.json());

    return data.map((blog: { slug: string }) => ({
      slug: blog.slug,
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

// Fixed: Properly await params in Next.js 15
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  if (!slug) {
    return {
      title: "Blog Not Found",
      description: "This blog post could not be found.",
    };
  }

  try {
    const post = await GetBlogDetail(slug);

    if (!post || post.length === 0 || !post[0]?.seo) {
      return {
        title: "Blog Not Found",
        description: "Unable to load blog details at the moment.",
      };
    }

    const seo = post[0]?.seo?.[0];

    return {
      title: seo?.metaTitle || "Default Blog Title",
      description: seo?.metaDescription || "Default Description",
      keywords: seo?.keywords || "",
      alternates: {
        canonical:
          seo?.canonicalURL ||
          `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog/${slug}`,
      },
      openGraph: {
        title: seo?.metaTitle || "Default Blog Title",
        description: seo?.metaDescription || "Default Description",
        url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog/${slug}`,
        images: [
          {
            url:
              seo?.image?.url ||
              `${process.env.NEXT_PUBLIC_BACKEND_URL}/default-image.jpg`,
            width: 800,
            height: 600,
          },
        ],
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog - Error",
      description: "An error occurred while loading this blog.",
    };
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  try {
    const data = await GetBlogDetail(slug);

    if (!data || data.length === 0) {
      notFound();
    }

    const blogDetail = data[0];

    return (
      <div className="bg-gradient-to-b from-indigo-50 to-white min-h-screen pb-12 mt-18">
        <BlogFeatures />

        <div className="container mx-auto max-w-4xl px-4">
          {/* Hero Image */}
          <div className="relative w-full h-80">
            <Image
              src={
                blogDetail.cover_image?.formats?.thumbnail?.url ||
                "/placeholder-image.jpg"
              }
              alt={blogDetail.title || "Blog post"}
              className="rounded-2xl h-[100%] w-[100%]"
              priority
              width={800}
              height={400}
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Author Info */}
          <div className="flex items-center mt-6 mb-6 bg-gray-100 w-fit rounded-3xl pr-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
              <Image
                src={
                  blogDetail?.auther?.profile_image?.url ||
                  "/placeholder-author.jpg"
                }
                alt={blogDetail?.auther?.name || "Author"}
                className="rounded-full h-[100%] w-[100%]"
                width={48}
                height={48}
                style={{ objectFit: "cover" }}
              />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">
                {blogDetail?.auther?.name || "Unknown Author"}
              </h3>
              <p className="text-sm text-gray-500">
                Posted{" "}
                {blogDetail.createdAt
                  ? dayjs(blogDetail.createdAt).fromNow()
                  : "Unknown date"}
              </p>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
            {blogDetail.title}
          </h1>

          {/* Tags */}
          {blogDetail.tags && blogDetail.tags.length > 0 && (
            <div className="flex items-center mb-3">
              <Tag size={14} className="text-indigo-600 mr-2" />
              <div className="flex flex-wrap gap-1">
                {blogDetail.tags.map((tag: { tag: string }, index: number) => (
                  <a
                    key={index}
                    href={`/blog/tag/${tag.tag?.toLowerCase()}`}
                    className="text-blue-600 bg-blue-50 border-blue-200 text-xs font-medium px-2 py-1 rounded border cursor-pointer hover:shadow-sm transition-all"
                  >
                    #{tag.tag}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Article Content */}
          <article className="bg-white shadow-md rounded-lg p-6 md:p-8 mb-8">
            <Article content={blogDetail.content} />
          </article>

          {/* Related Articles */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <RelatedBlog
                catageory={blogDetail.catageory}
                slug={blogDetail.slug}
              />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading blog post:", error);
    notFound();
  }
}
