"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { Menu, Search, X, BookOpen, Home, Bookmark, Tag } from "lucide-react";
import axios from "axios";
import Image from "next/image";

// Corrected types based on your actual API response
type Blog = {
  id: number;
  // Add other blog properties as needed
};

type Icon = {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  url?: string;
  // Add other icon properties as needed
};

type Category = {
  id: number;
  name: string;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  localizations: Record<string, unknown>;
  blogs: Blog[];
  icon: Icon;
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  // Memoize the fetch function to prevent recreating it on every render
  const fetchCategories = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:1337/api/catageories",
        {
          params: {
            populate: "*",
          },
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
          },
        }
      );

      setCategories(data?.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      return;
    }

    fetchCategories();
  }, [fetchCategories, categories.length]);

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

  // Handle portal mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

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
            <Link
              href="/"
              className="flex items-center"
              aria-label="DevBlog Home"
            >
              <div className="font-bold text-lg text-indigo-600">DevBlog</div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-8"
            aria-label="Main Navigation"
          >
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
              className={`text-gray-700 hover:text-indigo-600 flex items-center ${
                pathname === "/" ? "text-indigo-600 font-medium" : ""
              }`}
              aria-current={pathname === "/" ? "page" : undefined}
            >
              <Home size={18} className="mr-1" aria-hidden="true" />
              <span>Home</span>
            </Link>
            <Link
              href="/reading-list"
              className={`text-gray-700 hover:text-indigo-600 flex items-center ${
                pathname === "/reading-list"
                  ? "text-indigo-600 font-medium"
                  : ""
              }`}
              aria-current={pathname === "/reading-list" ? "page" : undefined}
            >
              <BookOpen size={18} className="mr-1" aria-hidden="true" />
              <span>Reading List</span>
            </Link>
            <Link
              href="/tags"
              className={`text-gray-700 hover:text-indigo-600 flex items-center ${
                pathname === "/tags" ? "text-indigo-600 font-medium" : ""
              }`}
              aria-current={pathname === "/tags" ? "page" : undefined}
            >
              <Tag size={18} className="mr-1" aria-hidden="true" />
              <span>Tags</span>
            </Link>
          </nav>

          {/* Mobile Navigation Button */}
          <div className="flex md:hidden items-center space-x-4">
            <button className="text-gray-700 p-1" aria-label="Search">
              <Search size={20} />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 p-1"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Portal */}
      {mounted &&
        isMenuOpen &&
        createPortal(
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden"
            aria-hidden="true"
            onClick={() => setIsMenuOpen(false)}
          >
            <div
              className="fixed top-0 right-0 bottom-0 w-3/4 max-w-xs bg-white shadow-xl z-50 overflow-y-auto"
              id="mobile-menu"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
            >
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="font-bold text-xl">DevBlog</h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 p-2"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              <nav className="px-4 py-2" aria-label="Mobile Navigation">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/categories/${category.name}`}
                    className="flex items-center p-3 hover:bg-gray-100 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="font-medium mr-1">{category.name}</span>
                    {category.icon && (
                      <Image
                        src={`${category.icon.url || ""}`}
                        alt={`${category.name} icon`}
                        className="w-5 h-5"
                        width={20}
                        height={20}
                      />
                    )}
                  </Link>
                ))}

                <Link
                  href="/"
                  className={`flex items-center p-3 hover:bg-gray-100 rounded-lg ${
                    pathname === "/" ? "bg-gray-100" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={pathname === "/" ? "page" : undefined}
                >
                  <Home
                    size={20}
                    className="mr-3 text-gray-600"
                    aria-hidden="true"
                  />
                  <span className="font-medium">Home</span>
                </Link>
                <Link
                  href="/reading-list"
                  className={`flex items-center p-3 hover:bg-gray-100 rounded-lg ${
                    pathname === "/reading-list" ? "bg-gray-100" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={
                    pathname === "/reading-list" ? "page" : undefined
                  }
                >
                  <BookOpen
                    size={20}
                    className="mr-3 text-gray-600"
                    aria-hidden="true"
                  />
                  <span className="font-medium">Reading List</span>
                </Link>
                <Link
                  href="/tags"
                  className={`flex items-center p-3 hover:bg-gray-100 rounded-lg ${
                    pathname === "/tags" ? "bg-gray-100" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={pathname === "/tags" ? "page" : undefined}
                >
                  <Tag
                    size={20}
                    className="mr-3 text-gray-600"
                    aria-hidden="true"
                  />
                  <span className="font-medium">Tags</span>
                </Link>
                <Link
                  href="/bookmarks"
                  className={`flex items-center p-3 hover:bg-gray-100 rounded-lg ${
                    pathname === "/bookmarks" ? "bg-gray-100" : ""
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={pathname === "/bookmarks" ? "page" : undefined}
                >
                  <Bookmark
                    size={20}
                    className="mr-3 text-gray-600"
                    aria-hidden="true"
                  />
                  <span className="font-medium">Bookmarks</span>
                </Link>
              </nav>
            </div>
          </div>,
          document.body
        )}
    </header>
  );
};

export default Header;
