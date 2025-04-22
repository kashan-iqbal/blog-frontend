"use client";
import { useEffect, useState } from "react";
import {
  Heart,
  MessageCircle,
  Bookmark,
  User,
  Clock,
  Share2,
  Send,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import axios from "axios";
import dayjs from "dayjs";
import Article from "../_component/markdown";
import { useGetBlogDetail } from "../Hook/ApiHook";
import relativeTime from "dayjs/plugin/relativeTime";
import RelatedBlog from "../_component/RelatedBlog";
import BlogFeatures from "../_component/BlogFeature";

dayjs.extend(relativeTime);

export default function BlogDetail() {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Maria Johnson",
      authorImg: "/api/placeholder/40/40",
      content:
        "This article was incredibly helpful! I've been struggling with optimizing my Tailwind setup and your tips about purging unused CSS really made a difference.",
      time: "2 days ago",
      likes: 8,
    },
    {
      id: 2,
      author: "David Chen",
      authorImg: "/api/placeholder/40/40",
      content:
        "Great insights on the JIT compiler. Have you considered doing a follow-up piece on how this impacts larger projects with multiple team members?",
      time: "1 day ago",
      likes: 5,
    },
  ]);

  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likedComments, setLikedComments] = useState({});

  const { slug } = useParams();

  const { data, error, loading } = useGetBlogDetail(
    Array.isArray(slug) ? slug[0] : slug || ""
  );

  // Related blog posts
  const relatedBlogs = [
    {
      id: 3,
      title: "Building Accessible Web Applications",
      description:
        "Learn how to make your web applications accessible to everyone. Discover best practices and tools to improve user experience for all users.",
      image: "/api/placeholder/400/200",
      author: "Marcus Williams",
      time: "3 days ago",
      likes: 207,
      comments: 32,
      tags: ["Accessibility", "UX", "Frontend"],
    },
    {
      id: 5,
      title: "Creating Stunning Animations with CSS and JavaScript",
      description:
        "Learn how to create beautiful animations that enhance user experience without compromising performance. Practical examples included.",
      image: "/api/placeholder/400/200",
      author: "Carlos Rodriguez",
      time: "2 weeks ago",
      likes: 143,
      comments: 29,
      tags: ["Animation", "CSS", "JavaScript"],
    },
    {
      id: 1,
      title: "Modern Web Development Trends in 2025",
      description:
        "Explore the latest technologies and methodologies shaping the future of web development. Learn about AI integration, serverless architecture, and more.",
      image: "/api/placeholder/400/200",
      author: "Alex Johnson",
      time: "2 hours ago",
      likes: 128,
      comments: 24,
      tags: ["Development", "Tech", "AI"],
    },
  ];

  // Tag colors mapping
  const tagColors = {
    CSS: "text-pink-600 bg-pink-50 border-pink-200",
    Design: "text-indigo-600 bg-indigo-50 border-indigo-200",
    Frontend: "text-cyan-600 bg-cyan-50 border-cyan-200",
    Accessibility: "text-amber-600 bg-amber-50 border-amber-200",
    UX: "text-teal-600 bg-teal-50 border-teal-200",
    Animation: "text-rose-600 bg-rose-50 border-rose-200",
    Development: "text-purple-600 bg-purple-50 border-purple-200",
    Tech: "text-blue-600 bg-blue-50 border-blue-200",
    AI: "text-green-600 bg-green-50 border-green-200",
    JavaScript: "text-red-600 bg-red-50 border-red-200",
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        id: comments.length + 1,
        author: "Current User",
        authorImg: "/api/placeholder/40/40",
        content: comment,
        time: "Just now",
        likes: 0,
      };
      setComments([...comments, newComment]);
      setComment("");
    }
  };

  const toggleCommentLike = (id) => {
    setLikedComments((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  console.log(data, loading, error, `i am the data page detail`);

  if (!data) {
    return <div>Loading...</div>;
  }
  const { seo } = data.data[0];

  const metaDescription = seo[0]?.metaDescription || "Default description";
  const metaTitle = seo[0]?.metaTitle || "Default title";

  const blogDetail = data.data[0];

  console.log(blogDetail.catageory, `i am the blog detail`);
  return (
    <div className="bg-gray-50 min-h-screen pb-12 mt-18">
      <BlogFeatures />
      {/* Main Content */}
      <div className="container mx-auto max-w-4xl px-4">
        {/* Header with Hero Image */}

        <div className="relative w-full h-80">
          <Image
            src={`${blogDetail.cover_image?.url}`}
            alt={blogDetail.title}
            className="rounded-2xl h-[100%] w-[100%]"
            priority
            height={100}
            width={100}
          />
        </div>

        {/* Author section */}

        <div className="flex items-center mt-6 mb-6 bg-gray-100">
          <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
            <Image
              src={`${blogDetail?.auther?.profile_image?.url}`}
              alt="Web3 Banner"
              className="rounded-2xl h-[100%] w-[100%]"
              priority
              height={100}
              width={100}
            />
          </div>
          <div>
            <h3 className="font-medium text-gray-900">
              {blogDetail?.auther?.name}
            </h3>
            <p className="text-sm text-gray-500">
              Posted on{" "}
              {blogDetail.createdAt
                ? `(${dayjs(blogDetail.createdAt).fromNow().toString()})`
                : "Unknown date"}
            </p>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          {blogDetail.title}
        </h1>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {blogDetail.tags.map((tag) => (
            <Link href={`/tag/${tag.tag}`} key={tag.documentId}>
              <span className=" inline-block px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer">
                #{tag.tag}
              </span>
            </Link>
          ))}
        </div>
        {/* Article Content */}
        <article className="bg-white shadow-md rounded-lg p-6 md:p-8 mb-8">
          <Article content={blogDetail.content} />
        </article>

        {/* Comments Section */}
        {/* <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">
            Comments ({comments.length})
          </h2>

          New comment form
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <div className="flex items-start gap-4">
              <Image
                src="https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fn0jljr04cbr9hpg28kbk.png"
                alt="Web3 Banner"
                className="object-cover   rounded-2xl"
                priority
                height={100}
                width={100}
              />
              <div className="flex-grow">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  rows={3}
                ></textarea>
                <div className="flex justify-end mt-2">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors"
                    disabled={!comment.trim()}
                  >
                    <Send size={16} className="mr-2" />
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </form>

          Comments list
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <img
                  src={comment.authorImg}
                  alt={comment.author}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-grow">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-medium">{comment.author}</h4>
                        <p className="text-gray-500 text-xs">{comment.time}</p>
                      </div>
                    </div>
                    <p className="text-gray-700">{comment.content}</p>
                  </div>
                  <div className="flex items-center mt-2 ml-2">
                    <button
                      onClick={() => toggleCommentLike(comment.id)}
                      className="flex items-center text-gray-500 hover:text-red-500 text-sm mr-4"
                    >
                      <Heart
                        size={14}
                        className={`mr-1 ${
                          likedComments[comment.id]
                            ? "fill-red-500 text-red-500"
                            : ""
                        }`}
                      />
                      <span>
                        {likedComments[comment.id]
                          ? comment.likes + 1
                          : comment.likes}
                      </span>
                    </button>
                    <button className="text-gray-500 hover:text-blue-500 text-sm">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* Related Posts */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <RelatedBlog
              blog={relatedBlogs}
              catageory={blogDetail.catageory}
              slug={blogDetail.slug}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
