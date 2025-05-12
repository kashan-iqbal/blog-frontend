"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Link from "next/link";
import Head from "next/head";
interface ContactFormData {
  first_name: string;
  last_name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormStatus {
  loading: boolean;
  success: string | null;
  error: string | null;
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    first_name: "",
    last_name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<FormStatus>({
    loading: false,
    success: null,
    error: null,
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const { first_name, last_name, email, subject, message } = formData;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-Z\s\-']{2,}$/;

    if (!nameRegex.test(first_name)) return "Please enter a valid first name.";
    if (!nameRegex.test(last_name)) return "Please enter a valid last name.";
    if (!emailRegex.test(email)) return "Please enter a valid email address.";
    if (subject.length < 3) return "Subject is too short.";
    if (message.length < 10) return "Message is too short.";

    return null;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setStatus({ loading: false, success: null, error: validationError });
      return;
    }

    setStatus({ loading: true, success: null, error: null });

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact-us-forms`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
          },
          body: JSON.stringify({ data: formData }),
        }
      );

      if (!res.ok) throw new Error("Server responded with an error.");

      setStatus({
        loading: false,
        success: "Message sent successfully!",
        error: null,
      });
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch {
      setStatus({
        loading: false,
        success: null,
        error: "Failed to send message. Please try again.",
      });
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us | MERN Blog</title>
        <meta
          name="description"
          content="Get in touch with the MERN Blog team for support or suggestions."
        />
        <link rel="canonical" href="https://mernblog.com/contact" />
        <meta property="og:title" content="Contact Us | MERN Blog" />
        <meta
          property="og:description"
          content="Reach out to the MERN Blog team for queries or feedback."
        />
        <meta property="og:url" content="https://mernblog.com/contact" />
        <meta name="twitter:title" content="Contact | MERN Blog" />
        <meta
          name="twitter:description"
          content="Have a question or suggestion? Contact the MERN Blog team."
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
        <div className="container mx-auto px-4 py-16 max-w-4xl">
          {/* Header */}
          <header className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-indigo-800 mb-4">
              Contact Us
            </h1>
            <div className="w-24 h-1 bg-indigo-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              If you have any questions, comments, or feedback, we&#39;d love to
              hear from you. Email us directly at{" "}
              <a
                href="mailto:kashan.tech.io@gmail.com"
                className="text-indigo-600 hover:text-indigo-800 font-medium"
              >
                kashan.tech.io@gmail.com
              </a>
              .
            </p>
          </header>

          {/* Contact Form Section */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold text-indigo-700 mb-6">
              Get In Touch
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    First Name*
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Last Name*
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject*
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message*
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
                  required
                ></textarea>
              </div>

              {/* Status Message */}
              {status.error && <p className="text-red-600">{status.error}</p>}
              {status.success && (
                <p className="text-green-600">{status.success}</p>
              )}

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={status.loading}
                  className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300 disabled:opacity-50"
                >
                  {status.loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
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
    </>
  );
}
