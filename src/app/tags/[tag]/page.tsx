import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Tag, Clock } from "lucide-react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface CoverImageFormat {
  url: string;
}

interface CoverImage {
  url: string;
  formats?: {
    small?: CoverImageFormat;
    medium?: CoverImageFormat;
    [key: string]: CoverImageFormat | undefined;
  };
}

interface BlogData {
  id: number;
  title: string;
  slug: string;
  createdAt: string;
  content: string;
  cover_image?: CoverImage;
  auther?: {
    name: string;
  };
  catageory?: {
    name: string;
  };
  tags?: { tag: string }[];
}

interface BlogCard {
  id: number;
  title: string;
  slug: string;
  image: string;
  author: string;
  tags: string[];
  time: string;
}

interface CategoryPageProps {
  params: Promise<{ tag: string }>;
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { tag } = await params;
  const teg = decodeURIComponent(tag);

  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BACKEND_URL
    }/api/blogs?filters[tags][tag][$eq]=${encodeURIComponent(
      teg
    )}&fields[0]=title&fields[1]=slug&fields[2]=id&fields[3]=createdAt&fields[4]=content&populate[cover_image][fields][0]=url&populate[cover_image][fields][1]=formats&populate[auther][fields][0]=name&populate[catageory][fields][0]=name&populate[tags][fields][0]=tag`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      },
      cache: "no-store",
    }
  );

  const json = await res.json();
  const data: BlogData[] = json.data;

  const blogs: BlogCard[] = data.map((item) => ({
    id: item.id,
    title: item.title,
    slug: item.slug,
    time: item.createdAt ?? "Unknown time", // Use `time` directly from API
    author: item.auther?.name ?? "Unknown",
    tags: item.tags?.map((t) => t.tag) ?? [],
    image:
      item.cover_image?.formats?.medium?.url ??
      item.cover_image?.formats?.small?.url ??
      item.cover_image?.url ??
      "/fallback.jpg",
  }));
  return (
    <div className="bg-gradient-to-b from-indigo-50 to-white min-h-screen pb-12 mt-18">
      <h1 className="text-center text-3xl font-bold my-8">
        Blogs in <span className="text-indigo-600"> &quot;{teg}&quot;</span>{" "}
        tags
      </h1>

      <div className="flex flex-wrap justify-center gap-6">
        {blogs.length && blogs.length > 0 ? (
          blogs.map((blog) => (
            <Link key={blog.id} href={`/blog/${blog.slug}`}>
              <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 w-full md:w-5/12 lg:w-80 xl:w-96 flex flex-col cursor-pointer">
                <div className="relative w-full h-48">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="rounded-t-lg object-cover"
                    priority
                  />
                </div>

                <div className="p-4 flex-grow flex flex-col">
                  <h2 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-2">
                    {blog.title}
                  </h2>

                  <div className="flex items-center mb-3">
                    <Tag size={14} className="text-gray-400 mr-2" />
                    <div className="flex flex-wrap gap-1">
                      {blog.tags.map((tag, index) => (
                        <Link
                          key={index}
                          href={`/tags/${tag}`}
                          className="text-blue-600 bg-blue-50 border-blue-200 text-xs font-medium px-2 py-1 rounded border cursor-pointer hover:shadow-sm transition-all"
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center text-xs text-gray-500 mb-1">
                    <Clock size={12} className="mr-1" />
                    {/* {blog.time} */}
                    <p className="ml-2 font-medium">By {blog.author}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg mt-10">
            No blogs found in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
