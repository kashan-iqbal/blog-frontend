import React from "react";
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
        {/* Our Story Section */}
        <section className="bg-white rounded-lg shadow-md p-8  mt-20">
          <h2 className="text-2xl md:text-3xl font-semibold text-indigo-700 mb-4">
            Our Story
          </h2>
          <p className="text-gray-700 mb-4">
            MERN Blog was launched in May 2025 as a personal project with a
            simple but ambitious goal: to make software engineering
            topics—especially system design and MERN stack development—more
            practical and accessible.
          </p>
          <p className="text-gray-700">
            It started small, driven by a passion for clear communication and
            real-world coding solutions. As the blog gains traction, it&#39;s
            becoming a growing resource for developers at all levels looking for
            guidance they can actually use.
          </p>
        </section>
        {/* Our Mission Section */}
        <section className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-indigo-700 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 mb-4">
            We know how hard it is to find clear, practical resources when
            you&#39;re trying to learn something new. That’s why this blog
            exists — to simplify complex topics and share solutions that
            actually work.
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Break down system design concepts with real-world examples</li>
            <li>Provide MERN stack solutions with clear code snippets</li>
            <li>Support everyone from beginners to experienced tech leads</li>
            <li>Keep things honest, accessible, and deeply useful</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
