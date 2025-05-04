import React from "react";
import Link from "next/link";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-800">
            Terms & Conditions
          </h1>
          <p className="text-sm text-gray-500">Last Updated: May 3, 2025</p>
        </header>

        <div className="bg-white p-6 shadow-md rounded-lg">
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-indigo-700">
              1. Agreement
            </h2>
            <p className="text-gray-700">
              By using this site, you agree to these Terms. We may change them
              at any time.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-indigo-700">
              2. Content Ownership
            </h2>
            <p className="text-gray-700">
              All content on the site is owned by us unless stated otherwise. No
              unauthorized use is allowed.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-indigo-700">
              3. User Content
            </h2>
            <p className="text-gray-700">
              By submitting content, you grant us the right to use it as we see
              fit.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-indigo-700">
              4. Prohibited Use
            </h2>
            <p className="text-gray-700">
              You may not use this site for illegal or harmful activities.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-indigo-700">
              5. Liability
            </h2>
            <p className="text-gray-700">
              We are not responsible for any damages resulting from your use of
              this site.
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-indigo-700">
              6. Governing Law
            </h2>
            <p className="text-gray-700">
              These terms are governed by the laws of [Your Country/Region].
            </p>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold text-indigo-700">
              7. Contact
            </h2>
            <p className="text-gray-700">
              For any questions, contact us at [Your Email].
            </p>
          </section>
        </div>

        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
