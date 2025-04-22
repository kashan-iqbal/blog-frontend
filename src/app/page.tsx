"use client";
import {
  Heart,
  MessageCircle,
  Bookmark,
  User,
  Clock,
  Tag,
  Share2,
} from "lucide-react";
import { useState } from "react";
import Cards from "./../features/post/card/Card";

export default function Home() {
  const [savedPosts, setSavedPosts] = useState({});
  const [likedPosts, setLikedPosts] = useState({});

  // Sample blog post data
  // const blogPosts = [
  //   {
  //     id: 1,
  //     title: "Modern Web Development Trends in 2025",
  //     description: "",
  //     image: "/api/placeholder/800/500",
  //     author: "Alex Johnson",
  //     time: "2 hours ago",
  //     likes: 128,
  //     comments: 24,
  //     tags: ["Development", "Tech", "AI"],
  //   },
  //   {
  //     id: 2,
  //     title: "Mastering Tailwind CSS: Advanced Techniques",
  //     description:
  //       "Take your Tailwind CSS skills to the next level with these advanced techniques. Learn how to create custom components and optimize your workflow.",
  //     image: "/api/placeholder/800/500",
  //     author: "Samantha Lee",
  //     time: "Yesterday",
  //     likes: 96,
  //     comments: 18,
  //     tags: ["CSS", "Design", "Frontend"],
  //   },
  //   {
  //     id: 3,
  //     title: "Building Accessible Web Applications",
  //     description:
  //       "Learn how to make your web applications accessible to everyone. Discover best practices and tools to improve user experience for all users.",
  //     image: "/api/placeholder/800/500",
  //     author: "Marcus Williams",
  //     time: "3 days ago",
  //     likes: 207,
  //     comments: 32,
  //     tags: ["Accessibility", "UX", "Frontend"],
  //   },
  //   {
  //     id: 4,
  //     title: "The Future of JavaScript Frameworks",
  //     description:
  //       "An in-depth analysis of where JavaScript frameworks are heading. Compare the latest updates in React, Vue, Angular, and emerging alternatives.",
  //     image: "/api/placeholder/800/500",
  //     author: "Priya Sharma",
  //     time: "1 week ago",
  //     likes: 184,
  //     comments: 46,
  //     tags: ["JavaScript", "Frameworks", "Development"],
  //   },
  //   {
  //     id: 5,
  //     title: "Creating Stunning Animations with CSS and JavaScript",
  //     description:
  //       "Learn how to create beautiful animations that enhance user experience without compromising performance. Practical examples included.",
  //     image: "/api/placeholder/800/500",
  //     author: "Carlos Rodriguez",
  //     time: "2 weeks ago",
  //     likes: 143,
  //     comments: 29,
  //     tags: ["Animation", "CSS", "JavaScript"],
  //   },
  //   {
  //     id: 6,
  //     title: "Data Visualization Techniques for Developers",
  //     description:
  //       "Discover effective ways to present complex data through visualizations. From charts to interactive dashboards, make your data tell a story.",
  //     image: "/api/placeholder/800/500",
  //     author: "Emma Chen",
  //     time: "3 weeks ago",
  //     likes: 112,
  //     comments: 16,
  //     tags: ["Data", "Visualization", "UX"],
  //   },
  // ];

  const toggleSave = (id) => {
    setSavedPosts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleLike = (id) => {
    setLikedPosts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleShare = (post) => {
    // In a real application, this would integrate with the Web Share API
    alert(`Sharing: ${post.title}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-18">
      <h1 className="text-3xl font-bold mb-8 text-center">My Blog</h1>

      {/* Changed to flex-wrap layout with max-width cards */}
      <Cards />
    </div>
  );
}
