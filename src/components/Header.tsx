"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
// import Image from 'next/image';
import {
  Menu,
  Search,
  X,
  Bell,
  BookOpen,
  Home,
  Bookmark,
  Tag,
  User,
} from "lucide-react";
import axios from "axios";
import Image from "next/image";
import NodeJs from "../../public/node-js.svg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [categories, setCategories] = useState([]);

  //   "http://localhost:1337/api/catageories",
  //   {
  //     params: {
  //       "fields[0]": "name",
  //     },
  //     headers: {
  //       Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
  //     },
  //   }
  // );
  // Fetch categories from Strapi
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          "  http://localhost:1337/api/catageories",
          {
            params: {
              populate: "*",
            },
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
            },
          }
        );

        setCategories(data?.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);
  console.log(categories);
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white md:bg-white/90"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative w-32 h-8">
                {/* Replace with your actual logo */}
                <div className="font-bold text-lg text-indigo-600">DevBlog</div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex  items-center space-x-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.name}`}
                className="text-gray-700 hover:text-indigo-600 flex items-center"
              >
                <span>{category.name}</span>
              </Link>
            ))}
            <Link
              href="/"
              className="text-gray-700 hover:text-indigo-600 flex items-center"
            >
              <Home size={18} className="mr-1" />
              <span>Home</span>
            </Link>
            <Link
              href="/reading-list"
              className="text-gray-700 hover:text-indigo-600 flex items-center"
            >
              <BookOpen size={18} className="mr-1" />
              <span>Reading List</span>
            </Link>
            <Link
              href="/tags"
              className="text-gray-700 hover:text-indigo-600 flex items-center"
            >
              <Tag size={18} className="mr-1" />
              <span>Tags</span>
            </Link>

            {/* Search Bar */}
            {/* <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-3 py-1 rounded-full bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48 lg:w-64"
              />
              <Search
                size={16}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
            </div> */}

            {/* User Actions */}
            {/* <div className="flex items-center space-x-5">
              <button className="text-gray-700 hover:text-indigo-600">
                <Bell size={20} />
              </button>
              <Link href="/profile" className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                  <User size={16} />
                </div>
              </Link>
              <Link
                href="/new"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700"
              >
                Create Post
              </Link>
            </div> */}
          </nav>

          {/* Mobile Navigation Button */}
          <div className="flex md:hidden items-center space-x-4">
            <button className="text-gray-700 p-1" aria-label="Search">
              <Search size={20} />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 p-1"
              aria-label="Menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Slide-in */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50  md:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`fixed top-0 right-0 bottom-0 w-3/4 max-w-xs bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="font-bold text-xl">DevBlog</h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-700"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          {/* <div className="p-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 pr-3 py-2 rounded-md bg-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
            />
          </div> */}

          <nav className="px-4 py-2">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.name}`}
                className="flex items-center p-3 hover:bg-gray-100 rounded-lg"
              >
                <span className="font-medium mr-1">{category.name}</span>
                <Image
                  src="https://res.cloudinary.com/dycygtfrv/image/upload/v1745165974/node_js_e9273b1d89.svg"
                  alt="Node.js Logo"
                  className="w-5 h-5"
                  width={5}
                  height={5}
                />
              </Link>
            ))}

            <Link
              href="/"
              className="flex items-center p-3 hover:bg-gray-100 rounded-lg"
            >
              <Home />
              <span className="font-medium">Home</span>
            </Link>
            <Link
              href="/reading-list"
              className="flex items-center p-3 hover:bg-gray-100 rounded-lg"
            >
              <BookOpen size={20} className="mr-3 text-gray-600" />
              <span className="font-medium">Reading List</span>
            </Link>
            <Link
              href="/tags"
              className="flex items-center p-3 hover:bg-gray-100 rounded-lg"
            >
              <Tag size={20} className="mr-3 text-gray-600" />
              <span className="font-medium">Tags</span>
            </Link>
            <Link
              href="/bookmarks"
              className="flex items-center p-3 hover:bg-gray-100 rounded-lg"
            >
              <Bookmark size={20} className="mr-3 text-gray-600" />
              <span className="font-medium">Bookmarks</span>
            </Link>
          </nav>
          {/* 
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
            <Link
              href="/new"
              className="block w-full bg-indigo-600 text-white text-center px-4 py-3 rounded-md font-medium hover:bg-indigo-700"
            >
              Create Post
            </Link>
            <div className="flex items-center mt-4 p-2 hover:bg-gray-100 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                <User size={20} />
              </div>
              <div className="ml-3">
                <p className="font-medium">Your Profile</p>
                <p className="text-sm text-gray-500">Settings & more</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
