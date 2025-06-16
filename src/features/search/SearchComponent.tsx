"use client";
import React, {
  useState,
  useEffect,
  useRef,
  ChangeEvent,
  useMemo,
} from "react";
import { Search, X, Hash, Calendar, User } from "lucide-react";
import Fuse from "fuse.js";
import { Datum, getblogSearch, Main } from "./serviceSearch";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

const BlogSearchComponent = () => {
  const [data, setData] = useState<Main | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Datum[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const router = useRouter();
  useEffect(() => {
    getblogSearch().then(setData).catch(console.error);
    setMounted(true);
  }, []);

  const fuse = useMemo(() => {
    if (!data) return null;
    return new Fuse(data.data, {
      keys: ["title", "tags.tag"],
      threshold: 0.3,
    });
  }, [data]);

  useEffect(() => {
    if (searchQuery.trim() && fuse) {
      const results = fuse.search(searchQuery).map((res) => res.item);
      setSearchResults(results);
      setSelectedIndex(-1);
    } else {
      setSearchResults([]);
      setSelectedIndex(-1);
    }
  }, [searchQuery, fuse]);

  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === "Escape") {
        closeDialog();
      }
    };

    window.addEventListener("keydown", handleShortcut as EventListener);
    return () =>
      window.removeEventListener("keydown", handleShortcut as EventListener);
  }, []);
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < searchResults.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const blog = searchResults[selectedIndex] || searchResults[0];
      if (blog) handleResultClick(blog);
    }
  };

  const handleResultClick = (blog: Datum) => {
    console.log(`Navigating to: /blog/${blog.slug}`);
    router.push(`/blog/${blog.slug}`);
    closeDialog();
  };

  const closeDialog = () => {
    setIsOpen(false);
    setSearchQuery("");
    setSelectedIndex(-1);
  };

  const formatDate = (date: string | Date): string => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const modalContent = (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity"
        onClick={closeDialog}
      />

      {/* Modal */}
      <div className="flex min-h-full items-start justify-center p-4 pt-16">
        <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Input */}
          <div className="flex items-center px-4 py-4 border-b border-gray-200">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search by title or tags..."
              value={searchQuery}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
              onKeyDown={handleKeyDown}
              className="flex-1 text-lg placeholder-gray-500 bg-transparent border-none outline-none"
            />
            <button
              onClick={closeDialog}
              className="ml-3 p-1 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-96 overflow-y-auto">
            {searchQuery && searchResults.length === 0 && (
              <div className="px-4 py-8 text-center text-gray-500">
                <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>No blogs found for &quot;{searchQuery}&quot;</p>
              </div>
            )}

            {searchQuery && searchResults.length > 0 && (
              <div className="py-2">
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  {searchResults.length} result
                  {searchResults.length !== 1 ? "s" : ""}
                </div>
                {searchResults.map((blog, index) => (
                  <button
                    key={blog.slug}
                    ref={(el) => {
                      resultsRef.current[index] = el;
                    }}
                    onClick={() => handleResultClick(blog)}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors duration-150 ${
                      selectedIndex === index
                        ? "bg-indigo-50 border-r-2 border-indigo-600"
                        : ""
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {blog.title}
                        </h3>
                        <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            <span>{blog.auther?.name ?? "Unknown Author"}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            <span>{formatDate(blog.createdAt)}</span>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {blog.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag.id}
                              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-100 rounded-full"
                            >
                              <Hash className="w-2.5 h-2.5" />
                              {tag.tag}
                            </span>
                          ))}
                          {blog.tags.length > 3 && (
                            <span className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded-full">
                              +{blog.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {!searchQuery && (
              <div className="px-4 py-8 text-center text-gray-500">
                <Search className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm">Start typing to search your blogs...</p>
                <p className="text-xs mt-1">Search by title or tags</p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 font-semibold bg-white border border-gray-200 rounded">
                    ↑↓
                  </kbd>
                  <span>Navigate</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 font-semibold bg-white border border-gray-200 rounded">
                    ↵
                  </kbd>
                  <span>Select</span>
                </div>
                <div className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 font-semibold bg-white border border-gray-200 rounded">
                    esc
                  </kbd>
                  <span>Close</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 text-sm text-gray-500 bg-white border border-gray-300 rounded-lg hover:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-colors duration-200"
      >
        <Search className="w-4 h-4" />
        <span>Search blogs...</span>
        <div className="flex items-center gap-1 ml-auto">
          <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded">
            ⌘
          </kbd>
          <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded">
            K
          </kbd>
        </div>
      </button>

      {/* Portal Modal */}
      {mounted && isOpen && createPortal(modalContent, document.body)}
    </>
  );
};

export default BlogSearchComponent;
