import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | MERN Blog",
  description:
    "MERN Blog is a modern tech blog focused on the MERN stack, system design, design patterns, and real-world engineering fixes.",
  alternates: {
    canonical: "https://mernblog.com/about",
  },
  openGraph: {
    title: "About MERN Blog",
    description:
      "Learn more about the mission and team behind MERN Blog — your go-to source for MERN stack and software engineering insights.",
    url: "https://mernblog.com/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About MERN Blog",
    description:
      "Discover why developers trust MERN Blog for modern web engineering content.",
  },
};

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-indigo-800 mb-4">
            About Our Blog
          </h1>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">
            Discover our story, mission, and the team behind the content
          </p>
        </header>

        {/* Main Content */}
        <div className="space-y-12">
          {/* Our Story Section */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-indigo-700 mb-4">
              Our Story
            </h2>
            <p className="text-gray-700 mb-4">
              Founded in 2022, our blog started as a passion project with a
              simple mission: to provide valuable, accurate, and engaging
              content for our readers. What began as a small personal blog has
              grown into a trusted resource for thousands of monthly visitors
              seeking information and insights.
            </p>
            <p className="text-gray-700">
              We&#39;re dedicated to maintaining the highest standards of
              content quality, factual accuracy, and reader satisfaction. Our
              team of experienced writers and subject matter experts work
              diligently to ensure every article provides genuine value.
            </p>
          </section>

          {/* Our Mission Section */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-indigo-700 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 mb-4">
              We believe in creating content that informs, inspires, and
              empowers. Our mission is to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>
                Provide well-researched, accurate information on topics that
                matter to our audience
              </li>
              <li>
                Create engaging, accessible content that&#39;s easy to
                understand and apply
              </li>
              <li>Foster a community of curious minds and lifelong learners</li>
              <li>
                Maintain transparency in all our content and business practices
              </li>
            </ul>
          </section>

          {/* Contact Information */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-indigo-700 mb-4">
              Get In Touch
            </h2>
            <p className="text-gray-700 mb-4">
              We value your feedback and are always open to suggestions,
              questions, or collaboration opportunities.
            </p>
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-medium">Email:</span>{" "}
                kashan.tech.io@gmail.com
              </p>
              <p>
                <span className="font-medium">Address:</span> North Nazmabad
                karachi
              </p>
            </div>
            <div className="mt-6">
              <Link
                href="/contact"
                className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-300"
              >
                Contact Us
              </Link>
            </div>
          </section>

          {/* Privacy & Terms */}
          <section className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl md:text-3xl font-semibold text-indigo-700 mb-4">
              Privacy & Terms
            </h2>
            <p className="text-gray-700 mb-4">
              We take your privacy seriously and are committed to transparency
              in our practices.
            </p>
            <div className="space-y-4">
              <Link
                href="/privacy-policy"
                className="block text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
              >
                Privacy Policy →
              </Link>
              <Link
                href="/terms"
                className="block text-indigo-600 hover:text-indigo-800 transition-colors duration-300"
              >
                Terms of Service →
              </Link>
            </div>
          </section>
        </div>

        {/* Back to Home */}
        <div className="mt-12 text-center">
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
