"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import axios from "axios";
import Image from "next/image";
import logo from "@/../public/logo.png";
import { cat } from "./constant";
import BlogSearchComponent from "@/features/search/SearchComponent";

type Subcategory = {
  id: number;
  name: string;
  icon: string;
};

type Category = {
  id: number;
  name: string;
  catageories: Subcategory[] | null;
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [categories, setCategories] = useState<Category[]>(cat);
  const [mounted, setMounted] = useState(false);
  const [openCategoryId, setOpenCategoryId] = useState<number | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  // Memoize the fetch function to prevent recreating it on every render
  const fetchCategories = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/parrent-catageories?populate[catageories][populate]=icon`,
        {
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
    if (isMenuOpen || isSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen, isSearchOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setOpenCategoryId(null);
    setIsSearchOpen(false);
  }, [pathname]);

  // Handle mobile category toggle
  const handleCategoryToggle = (categoryId: number) => {
    setOpenCategoryId(openCategoryId === categoryId ? null : categoryId);
  };
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md"
          : "bg-white md:bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Main header row */}
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="flex items-center"
              aria-label="DevBlog Home"
            >
              <Image
                src={logo}
                alt="logo"
                height={45}
                width={60}
                className="object-contain"
              />
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center">
            <BlogSearchComponent />
          </div>

          {/* Mobile Navigation Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-gray-700 p-2"
              aria-label="Search"
            >
              {/* <Search size={20} /> */}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 p-2"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Desktop Navigation - Two Row Layout */}
        <nav
          className="hidden md:block border-t border-gray-100 py-2"
          aria-label="Main Navigation"
        >
          {/* First Row */}
          <div className="flex items-center justify-center space-x-6 py-1">
            {categories.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </div>
        </nav>
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
              className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white shadow-xl z-50 overflow-y-auto"
              id="mobile-menu"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
            >
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="font-bold text-lg">
                  <Image src={logo} alt="logo" height={40} width={55} />
                </h2>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 p-2"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="px-4 py-2" aria-label="Mobile Navigation">
                <BlogSearchComponent />
                {categories?.map((category) => (
                  <div key={category.id} className="mb-1">
                    <MobileCategoryItem
                      category={category}
                      isOpen={openCategoryId === category.id}
                      onToggle={handleCategoryToggle}
                    />
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

// Desktop category component with improved spacing
function CategoryItem({ category }: { category: Category }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
  const hasSubcategories =
    category?.catageories && category.catageories.length > 0;

  // Handle hover with delay
  const handleMouseEnter = () => {
    if (hoverTimeout) clearTimeout(hoverTimeout);
    if (window.innerWidth >= 768 && hasSubcategories) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768 && hasSubcategories) {
      const timeout = setTimeout(() => setIsOpen(false), 150);
      setHoverTimeout(timeout);
    }
  };

  // Handle click
  const handleClick = () => {
    if (hasSubcategories) {
      setIsOpen(!isOpen);
    }
  };

  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (hoverTimeout) clearTimeout(hoverTimeout);
    };
  }, [hoverTimeout]);

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="flex items-center text-gray-700 hover:text-indigo-600 cursor-pointer px-2 py-1.5 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium"
        onClick={handleClick}
      >
        <span className="mr-1 whitespace-nowrap font-extrabold">
          {category.name}
        </span>
        {hasSubcategories && (
          <ChevronDown
            className={`h-3 w-3 text-gray-500 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </div>

      {hasSubcategories && (
        <div
          className={`absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 w-56 transition-all duration-200 ease-out ${
            isOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="py-2">
            {category?.catageories?.map((subcategory) => (
              <Link
                href={`/category/${subcategory.name}`}
                key={subcategory.id}
                className="flex items-center px-4 py-2 text-sm text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition-colors"
              >
                {subcategory.icon && (
                  <Image
                    src={subcategory.icon}
                    alt={`${subcategory.name} icon`}
                    width={16}
                    height={16}
                    className="mr-3 rounded-sm flex-shrink-0"
                  />
                )}
                <span className="font-normal">{subcategory.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Mobile category component
function MobileCategoryItem({
  category,
  isOpen,
  onToggle,
}: {
  category: Category;
  isOpen: boolean;
  onToggle: (categoryId: number) => void;
}) {
  const hasSubcategories =
    category?.catageories && category.catageories.length > 0;

  return (
    <>
      <div
        className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer"
        onClick={() => hasSubcategories && onToggle(category.id)}
      >
        <span className="font-medium text-sm">{category.name}</span>
        {hasSubcategories && (
          <ChevronRight
            className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
              isOpen ? "rotate-90" : ""
            }`}
          />
        )}
      </div>

      {hasSubcategories && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="pl-4 border-l-2 border-gray-100 ml-3 mt-1">
            {category?.catageories?.map((subcategory) => (
              <Link
                href={`/category/${subcategory.name}`}
                key={subcategory.id}
                className="flex items-center p-2 hover:bg-gray-50 rounded-lg my-1 text-sm"
              >
                {subcategory.icon && (
                  <Image
                    src={subcategory.icon}
                    alt={`${subcategory.name} icon`}
                    width={16}
                    height={16}
                    className="mr-2 rounded-sm flex-shrink-0"
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
