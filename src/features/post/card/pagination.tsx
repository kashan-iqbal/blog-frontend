// components/Pagination.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PaginationMeta } from "./../hook/ApiHook";

interface PaginationProps {
  pagination: PaginationMeta;
  basePath: string;
}

export default function Pagination({ pagination, basePath }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { page, pageCount } = pagination;

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5; // Show at most 5 page numbers

    // Calculate range
    let startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(pageCount, startPage + maxPagesToShow - 1);

    // Adjust if needed to always show 5 pages if possible
    if (
      endPage - startPage + 1 < maxPagesToShow &&
      pageCount >= maxPagesToShow
    ) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > pageCount) return;

    // Create new URLSearchParams
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());

    // Navigate to the new URL
    router.push(`${basePath}?${params.toString()}`);
  };

  // Don't render if there's only one page
  if (pageCount <= 1) return null;

  return (
    <div className="flex justify-center items-center mt-8 mb-4">
      <nav className="flex items-center gap-1">
        {/* Previous button */}
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className={`p-2 rounded-md ${
            page === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        {/* First page */}
        {getPageNumbers()[0] > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className={`w-8 h-8 flex items-center justify-center rounded-md ${
                page === 1 ? "bg-indigo-600 text-white" : "hover:bg-gray-100"
              }`}
            >
              1
            </button>
            {getPageNumbers()[0] > 2 && (
              <span className="px-2 text-gray-500">...</span>
            )}
          </>
        )}

        {/* Page numbers */}
        {getPageNumbers().map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={`w-8 h-8 flex items-center justify-center rounded-md ${
              page === pageNum
                ? "bg-indigo-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {pageNum}
          </button>
        ))}

        {/* Last page */}
        {getPageNumbers()[getPageNumbers().length - 1] < pageCount && (
          <>
            {getPageNumbers()[getPageNumbers().length - 1] < pageCount - 1 && (
              <span className="px-2 text-gray-500">...</span>
            )}
            <button
              onClick={() => handlePageChange(pageCount)}
              className={`w-8 h-8 flex items-center justify-center rounded-md ${
                page === pageCount
                  ? "bg-blue-600 text-white"
                  : "hover:bg-gray-100"
              }`}
            >
              {pageCount}
            </button>
          </>
        )}

        {/* Next button */}
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page === pageCount}
          className={`p-2 rounded-md ${
            page === pageCount
              ? "text-gray-400 cursor-not-allowed"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </nav>
    </div>
  );
}
