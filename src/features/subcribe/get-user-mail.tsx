"use client";
import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Mail, Gift } from "lucide-react";

export const EmailPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Configuration - all handled internally
  const delayMs = 10000; // 30 seconds default
  const repeatAfterDays = 3; // Show again after 7 days
  const title = "Don't Miss Out! 📧";
  const description =
    "Join thousands of readers who get our best content delivered straight to their inbox. No spam, just quality insights!";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Check if user has already seen the popup recently
    const lastShown = localStorage.getItem("emailPopupLastShown");
    const now = Date.now();

    if (lastShown) {
      const daysSinceLastShown =
        (now - parseInt(lastShown)) / (1000 * 60 * 60 * 24);
      if (daysSinceLastShown < repeatAfterDays) {
        return; // Don't show popup yet
      }
    }

    // Check if user already subscribed
    const hasSubscribed = localStorage.getItem("emailPopupSubscribed");
    if (hasSubscribed === "true") {
      return; // Don't show popup to subscribers
    }

    // Set timer to show popup
    const timer = setTimeout(() => {
      setIsVisible(true);
      localStorage.setItem("emailPopupLastShown", now.toString());
    }, delayMs);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setError(null);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/news-letters`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
          },
          body: JSON.stringify({ data: { email } }),
        }
      );

      console.log(response);
      if (!response.ok) throw new Error("Failed to subscribe.");

      setIsSubmitted(true);
      localStorage.setItem("emailPopupSubscribed", "true");
      setEmail("");

      // Auto close after success
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      console.error("Email submission failed:", error);
      setError("Subscription failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  if (!mounted || !isVisible) return null;

  const popupContent = (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      />

      {/* Popup */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {!isSubmitted ? (
            <>
              {/* Header with Icon */}
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 px-6 pt-8 pb-6 text-white text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-black" />
                </div>
                <h2 className="text-2xl font-bold mb-2">{title}</h2>
                <p className="text-indigo-100 text-sm leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Form */}
              <div className="px-6 py-6">
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
                      required
                    />
                  </div>

                  {error && (
                    <div className="text-red-500 text-sm text-center">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!validateEmail(email) || isSubmitting}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Subscribing...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center">
                        <Gift className="w-5 h-5 mr-2" />
                        Get Free Updates
                      </span>
                    )}
                  </button>
                </form>

                {/* Trust Indicators */}
                <div className="mt-4 text-center text-xs text-gray-500">
                  <div className="flex items-center justify-center space-x-4">
                    <span className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-1"></div>
                      No spam
                    </span>
                    <span className="flex items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mr-1"></div>
                      Unsubscribe anytime
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Success State */
            <div className="px-6 py-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                You&#39;re All Set! 🎉
              </h3>
              <p className="text-gray-600 text-sm">
                Thank you for subscribing! You&#39;ll receive our best content
                straight to your inbox.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(popupContent, document.body);
};
