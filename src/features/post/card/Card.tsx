"use client";
import { Clock, Tag } from "lucide-react";
import React from "react";
import { useBlogPosts } from "../hook/ApiHook";
import Image from "next/image";
import Link from "next/link";

const Cards = () => {
  const { blogs, loading, error } = useBlogPosts();

  if (loading) {
    <div className="container mx-auto py-12 mt-4 text-center">Loading....</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto py-12 mt-4 text-center">
        Failed to load blog posts
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center items-center gap-6">
      {blogs.length > 0 &&
        blogs.map((blog) => (
          <Link key={blog.id} href={`/blog/${blog.slug}`}>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 w-full md:w-5/12 lg:w-80 xl:w-96 flex flex-col cursor-pointer">
              {/* Image */}
              <div className="relative w-full h-48">
                <Image
                  src={`${blog.image}`}
                  alt={blog.title}
                  fill
                  className="rounded-t-lg"
                  loading="lazy"
                />
              </div>

              {/* Content */}
              <div className="p-4 flex-grow flex flex-col">
                <h2 className="text-xl font-semibold mb-2 text-gray-800 line-clamp-2">
                  {blog.title}
                </h2>
                {/* Tags moved below title with professional styling */}
                <div className="flex items-center mb-3">
                  <Tag size={14} className="text-gray-400 mr-2" />
                  <div className="flex flex-wrap gap-1">
                    {blog.tags.map((tag, index) => (
                      <Link
                        key={index}
                        href={`/tags/${tag}`}
                        className={`text-blue-600 bg-blue-50 border-blue-200 text-xs font-medium px-2 py-1 rounded border cursor-pointer hover:shadow-sm transition-all`}
                      >
                        #{tag}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                  {blog.description}......
                </p> */}

                {/* Author and time */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock size={12} className="mr-1" />
                    {blog.time}
                  </div>
                  <p className="text-xs font-medium ml-2"> By({blog.author})</p>
                </div>

                {/* Push interaction bar to bottom with flex-grow */}
                {/* <div className="mt-auto">
                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    <button
                      className="flex items-center text-gray-600 hover:text-red-500 transition-colors"
                    >
                      <Heart
                        size={16}
                      />
                      <span className="text-sm">
                      </span>
                    </button>

                    <button className="flex items-center text-gray-600 hover:text-blue-500 transition-colors">
                      <MessageCircle size={16} className="mr-1" />
                      <span className="text-sm"></span>
                    </button>

                    <button
                      className="flex items-center text-gray-600 hover:text-green-500 transition-colors"
                    >
                      <Share2 size={18} />
                    </button>

                    <button
                      className="flex items-center text-gray-600 hover:text-yellow-500 transition-colors"
                    >
                      <Bookmark size={16} />
                    </button>
                  </div>
                </div> */}
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
};

export default Cards;
