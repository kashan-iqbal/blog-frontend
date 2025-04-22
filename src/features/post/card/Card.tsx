"use client";
import {
  Bookmark,
  Clock,
  Heart,
  MessageCircle,
  Share2,
  Tag,
} from "lucide-react";
import React from "react";
import { useBlogPosts } from "../hook/ApiHook";
import Image from "next/image";
import Link from "next/link";

const Cards = () => {
  const { blogs, loading, error } = useBlogPosts();

  console.log(blogs, loading, error);

  return (
    <div className="flex flex-wrap justify-center gap-6">
      {blogs.length > 0 &&
        blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 w-full md:w-5/12 lg:w-80 xl:w-96 flex flex-col cursor-pointer"
          >
            <Link href={`/blog/${blog.slug}`}>
              {/* Image */}
              <div className="relative w-full h-48">
                <Image
                  src={`${blog.image}`}
                  alt={blog.title}
                  fill
                  className="rounded-t-lg"
                  priority={true}
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
                      <a
                        key={index}
                        href={`#${tag.toLowerCase()}`}
                        className={`text-blue-600 bg-blue-50 border-blue-200'} text-xs font-medium px-2 py-1 rounded border cursor-pointer hover:shadow-sm transition-all`}
                      >
                        #{tag}
                      </a>
                    ))}
                  </div>
                </div>

                <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                  {blog.description}......
                </p>

                {/* Author and time */}
                <div className="flex items-center mb-4">
                  <p className="text-sm font-medium mr-2">{blog.author}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock size={12} className="mr-1" />
                    {blog.time}
                  </div>
                </div>

                {/* Push interaction bar to bottom with flex-grow */}
                <div className="mt-auto">
                  {/* Interaction bar */}
                  <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                    {/* Likes */}
                    <button
                      // onClick={() => toggleLike(post.id)}
                      className="flex items-center text-gray-600 hover:text-red-500 transition-colors"
                    >
                      <Heart
                        size={16}
                        //   className={`mr-1 ${
                        //     likedPosts[post.id] ? "fill-red-500 text-red-500" : ""
                        //   }`}
                      />
                      <span className="text-sm">
                        {/* {likedPosts[post.id] ? post.likes + 1 : post.likes} */}
                      </span>
                    </button>

                    {/* Comments */}
                    <button className="flex items-center text-gray-600 hover:text-blue-500 transition-colors">
                      <MessageCircle size={16} className="mr-1" />
                      <span className="text-sm"></span>
                    </button>

                    {/* Share */}
                    <button
                      // onClick={() => handleShare(post)}
                      className="flex items-center text-gray-600 hover:text-green-500 transition-colors"
                    >
                      <Share2 size={18} />
                    </button>

                    {/* Save for later */}
                    <button
                      // onClick={() => toggleSave(post.id)}
                      className="flex items-center text-gray-600 hover:text-yellow-500 transition-colors"
                    >
                      <Bookmark
                        size={16}
                        //   className={`${
                        //     savedPosts[post.id]
                        //       ? "fill-yellow-500 text-yellow-500"
                        //       : ""
                        //   }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default Cards;
