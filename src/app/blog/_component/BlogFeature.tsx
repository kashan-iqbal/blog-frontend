// BlogFeatures.jsx
"use client";
import { useState, useEffect } from "react";
import {
  ChevronUp,
  Share2,
  Twitter,
  Facebook,
  Linkedin,
  Link as LinkIcon,
} from "lucide-react";

export default function BlogFeatures() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showShareTooltip, setShowShareTooltip] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      // Show scroll-to-top button after scrolling down 300px
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareTooltip(false);
  };

  const shareOnSocial = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);

    let shareUrl;
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, "_blank", "width=600,height=400");
    setShowShareTooltip(false);
  };

  return (
    <>
      {/* Scroll Progress Bar - Fixed at top */}
      <div className="fixed top-15 left-0 w-full h-1 z-50 bg-gray-200 ">
        <div
          className="h-full bg-indigo-600  transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Share Button - Fixed on side */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-40 md:flex flex-col items-center hidden">
        <button
          className="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 relative"
          onClick={() => setShowShareTooltip(!showShareTooltip)}
        >
          <Share2 size={20} className="text-gray-700" />
        </button>

        {/* Share options tooltip */}
        {showShareTooltip && (
          <div className="absolute left-16 bg-white rounded-lg shadow-xl p-3 w-48">
            <div className="flex flex-col gap-2">
              <button
                onClick={() => shareOnSocial("twitter")}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md"
              >
                <Twitter size={16} className="text-blue-400" />
                <span>Twitter</span>
              </button>
              <button
                onClick={() => shareOnSocial("facebook")}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md"
              >
                <Facebook size={16} className="text-blue-600" />
                <span>Facebook</span>
              </button>
              <button
                onClick={() => shareOnSocial("linkedin")}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md"
              >
                <Linkedin size={16} className="text-blue-700" />
                <span>LinkedIn</span>
              </button>
              <button
                onClick={copyUrlToClipboard}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md"
              >
                <LinkIcon size={16} className="text-gray-600" />
                <span>Copy link</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Share Button - Only shows on small screens */}
      <div className="fixed bottom-16 right-4 md:hidden z-40">
        <button
          className="bg-indigo-600 p-3 rounded-full shadow-lg text-white hover:bg-indigo-700"
          onClick={() => setShowShareTooltip(!showShareTooltip)}
        >
          <Share2 size={20} />
        </button>

        {/* Mobile share options */}
        {showShareTooltip && (
          <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl p-3 w-48">
            <div className="flex flex-col gap-2">
              <button
                onClick={() => shareOnSocial("twitter")}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md"
              >
                <Twitter size={16} className="text-blue-400" />
                <span>Twitter</span>
              </button>
              <button
                onClick={() => shareOnSocial("facebook")}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md"
              >
                <Facebook size={16} className="text-blue-600" />
                <span>Facebook</span>
              </button>
              <button
                onClick={() => shareOnSocial("linkedin")}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md"
              >
                <Linkedin size={16} className="text-blue-700" />
                <span>LinkedIn</span>
              </button>
              <button
                onClick={copyUrlToClipboard}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md"
              >
                <LinkIcon size={16} className="text-gray-600" />
                <span>Copy link</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-40"
        >
          <ChevronUp size={20} />
        </button>
      )}
    </>
  );
}
