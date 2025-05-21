import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MERN Blog | Learn MERN Stack, System Design & Modern Web Dev",
  description:
    "Read expert-level blogs on the MERN Stack, JavaScript, system design, debugging, and modern web development. Stay ahead with tutorials, patterns, and real-world tips.",
  keywords: [
    "MERN Stack blog",
    "JavaScript tutorials",
    "React blog",
    "Node.js blog",
    "MongoDB",
    "Express.js",
    "System design patterns",
    "Web development tips",
    "Frontend and backend development",
    "Debugging in JavaScript",
  ],
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_FRONTEND_URL}`,
  },
  openGraph: {
    title: "MERN Blog | Learn MERN Stack, System Design & Modern Web Dev",
    description:
      "Your go-to blog for mastering the MERN Stack, coding patterns, debugging strategies, and scalable web architecture.",
    url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}`,
    type: "website",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/COVER_IMAGE.svg`,
        width: 1200,
        height: 630,
        alt: "MERN Blog - Modern Web Dev",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${inter.variable} antialiased bg-gradient-to-b from-indigo-50 to-white`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
