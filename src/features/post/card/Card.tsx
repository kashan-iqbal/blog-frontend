// features/post/card/Card.tsx
import { Clock, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getBlogPosts } from "../hook/ApiHook"; // Updated data fetching

export default async function Cards() {
  const blogs = await getBlogPosts();

  if (!blogs || blogs.length === 0) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-500">No blogs available</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-8 text-center">My Blog</h1>
      <div className="flex flex-wrap justify-center items-center gap-6">
        {blogs.map((blog, index) => (
          <Link
            key={blog.id}
            href={`/blog/${blog.slug}`}
            className="w-full md:w-[45%] lg:w-[30%] xl:w-[25%]"
          >
            <article className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
              <div className="relative w-full aspect-video">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 3} // Prioritize first 3 images
                />
              </div>

              <div className="p-4 flex-grow flex flex-col">
                <h2 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-2">
                  {blog.title}
                </h2>

                <div className="flex items-center mb-3">
                  <Tag size={14} className="text-gray-400 mr-2" />
                  <div className="flex flex-wrap gap-1">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-blue-600 bg-blue-50 border-blue-200 text-xs font-medium px-2 py-1 rounded border"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center mt-auto text-xs text-gray-500">
                  <Clock size={12} className="mr-1" />
                  {blog.time}
                  <span className="mx-2">•</span>
                  <span>By {blog.author}</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </>
  );
}
