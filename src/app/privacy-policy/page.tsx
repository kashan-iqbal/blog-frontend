import React from "react";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-800 mb-4">
            Privacy Policy
          </h1>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your privacy is important to us. This Privacy Policy outlines how we
            collect, use, and protect your personal information when you visit
            our website.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Last Updated: May 3, 2025
          </p>
        </header>

        {/* Privacy Policy Content */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          {/* Introduction */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
              Introduction
            </h2>
            <p className="text-gray-700">
              We value your privacy and are committed to protecting your
              personal information. This Privacy Policy describes how we
              collect, use, and protect your data when you visit our website.
            </p>
          </section>

          {/* Information We Collect */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-700">
              We collect personal information that you voluntarily provide to us
              (e.g., name, email) and automatically collected information such
              as your IP address, browser type, and pages visited.
            </p>
          </section>

          {/* How We Use Your Information */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-700">
              We use your information to operate our website, communicate with
              you, and improve our services. We may also use your information
              for analytics and advertising purposes.
            </p>
          </section>

          {/* Cookies and Tracking Technologies */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
              Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-700">
              We use cookies to enhance your experience on our website. You can
              control cookie settings through your browser.
            </p>
          </section>

          {/* Third-Party Services */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
              Third-Party Services
            </h2>
            <p className="text-gray-700">
              We use third-party services like Google Analytics and Google
              AdSense to improve our website and serve ads. These services may
              collect information about your visits to our site.
            </p>
          </section>

          {/* Your Rights */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
              Your Rights
            </h2>
            <p className="text-gray-700">
              Depending on your location, you may have the right to access,
              update, or delete your personal data. Please contact us if
              you&#39;d like to exercise any of these rights.
            </p>
          </section>

          {/* Changes to the Privacy Policy */}
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
              Changes to This Privacy Policy
            </h2>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by updating the &quot;Last Updated&quot;
              date at the top of this page.
            </p>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="text-2xl font-semibold text-indigo-700 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700">
              If you have any questions about this Privacy Policy or our data
              practices, please contact us at [your contact email].
            </p>
          </section>
        </div>

        {/* Back to Home */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
