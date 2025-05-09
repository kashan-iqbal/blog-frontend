"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { Menu, Search, X, Home, ChevronDown, ChevronRight } from "lucide-react";
import axios from "axios";
import Image from "next/image";
import logo from "@/../public/Adobe Express - file.png";

type Icon = {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string | null;
  caption: string | null;
  url: string;
  width?: number;
  height?: number;
  formats?: {
    small?: {
      url: string;
    };
    thumbnail?: {
      url: string;
    };
  };
  // Add other icon properties as needed
};

type Subcategory = {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  icon: Icon | null;
};

type Category = {
  id: number;
  name: string;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  catageories: Subcategory[];
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
      // http://localhost:1337/api/parrent-catageories?populate[catageories][populate]=icon
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/parrent-catageories?populate[catageories][populate]=icon`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
          },
        }
      );
      console.log(data, `i am the reponce`);
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
              <div className="font-bold text-lg text-indigo-600">
                <Image src={logo} alt="logo" height={100} width={100} />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-8"
            aria-label="Main Navigation"
          >
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
            <CategoryList categories={categories} />
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
                {categories?.map((category) => (
                  <div key={category.id} className="mb-2">
                    <MobileCategoryItem category={category} />
                  </div>
                ))}
              </nav>
            </div>
          </div>,
          document.body
        )}
    </header>
  );
};

// Desktop category components
function CategoryList({ categories }: { categories: Category[] }) {
  return (
    <div className="hidden md:flex items-center space-x-4">
      {categories?.map((category) => (
        <CategoryItem key={category.id} category={category} />
      ))}
    </div>
  );
}

function CategoryItem({ category }: { category: Category }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubcategories =
    category?.catageories && category.catageories.length > 0;

  // For desktop: handle hover events
  const handleMouseEnter = () => {
    if (window.innerWidth >= 768 && hasSubcategories) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768 && hasSubcategories) {
      setIsOpen(false);
    }
  };

  // For mobile and desktop: handle click
  const handleClick = () => {
    if (hasSubcategories) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="flex items-center text-gray-700 hover:text-indigo-600 cursor-pointer px-2 py-1"
        onClick={handleClick}
      >
        <span className="font-medium mr-1">{category.name}</span>
        {hasSubcategories && (
          <span className="text-gray-500">
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </span>
        )}
      </div>

      {hasSubcategories && (
        <div
          className={`absolute top-full left-0 mt-0 bg-white rounded-md shadow-lg w-48 border border-gray-200 transition-all duration-300 ease-in-out ${
            isOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          <div className="py-1 ">
            {category.catageories.map((subcategory) => (
              <Link
                href={`/categories/${subcategory.name}`}
                key={subcategory.id}
                className="block px-4 py-2 text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center">
                  {subcategory.icon && (
                    <Image
                      src={subcategory.icon.url}
                      alt={`${subcategory.name} icon`}
                      width={20}
                      height={20}
                      className="mr-2 rounded-sm"
                    />
                  )}
                  <span>{subcategory.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Mobile category component
function MobileCategoryItem({ category }: { category: Category }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubcategories =
    category?.catageories && category.catageories.length > 0;

  return (
    <>
      <div
        className="flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg cursor-pointer"
        onClick={() => hasSubcategories && setIsOpen(!isOpen)}
      >
        <span className="font-medium">{category.name}</span>
        {hasSubcategories && (
          <span className="text-gray-500">
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </span>
        )}
      </div>

      {hasSubcategories && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pl-6 border-l-2 border-gray-200 ml-3">
            {category.catageories.map((subcategory) => (
              <Link
                href={`/categories/${subcategory.name}`}
                key={subcategory.id}
                className="flex items-center p-2 hover:bg-gray-50 rounded-lg my-1"
                onClick={() => setIsOpen(false)}
              >
                {subcategory.icon && (
                  <Image
                    src={subcategory.icon.url}
                    alt={`${subcategory.name} icon`}
                    width={20}
                    height={20}
                    className="mr-2 rounded-sm"
                  />
                )}
                <span>{subcategory.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
