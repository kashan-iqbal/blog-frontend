// app/blog/page.tsx
import Cards from "@/features/post/card/Card";
import type { Metadata } from "next";

interface BlogPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

// 🔥 Dynamic Metadata with pagination
export async function generateMetadata({
  searchParams,
}: {
  searchParams: BlogPageProps["searchParams"];
}): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const pageParam = resolvedSearchParams?.page;
  const currentPage =
    typeof pageParam === "string" ? parseInt(pageParam, 10) : 1;

  const baseUrl =
    process.env.NEXT_PUBLIC_FRONTEND_URL || "https://mernblog.com";
  const canonicalUrl = `${baseUrl}/blog${
    currentPage > 1 ? `?page=${currentPage}` : ""
  }`;
  const prevUrl =
    currentPage > 1
      ? `${baseUrl}/blog${currentPage > 2 ? `?page=${currentPage - 1}` : ""}`
      : null;
  const nextUrl = `${baseUrl}/blog?page=${currentPage + 1}`;

  const title =
    currentPage > 1
      ? `Page ${currentPage} - MERN Blog | Dev Patterns, Debugging & System Design`
      : "MERN Blog - Web Dev, System Design, and MERN Stack Tips";

  const description =
    currentPage > 1
      ? `Page ${currentPage} of MERN Blog — explore tips on system design, debugging, architecture & development practices.`
      : "Explore the latest in MERN Stack development, debugging, system design, and clean coding strategies.";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: `${process.env.NEXT_PUBLIC_FRONTEND_URL}/COVER_IMAGE.svg`,
          width: 1200,
          height: 630,
          alt: "MERN Blog OG Image",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${process.env.NEXT_PUBLIC_FRONTEND_URL}/COVER_IMAGE.svg`],
    },
    other: {
      ...(prevUrl && { "link:prev": prevUrl }),
      "link:next": nextUrl,
    },
  };
}

// 🔥 Main Blog Page Component
export default async function BlogPage({
  searchParams,
}: {
  searchParams: BlogPageProps["searchParams"];
}) {
  const resolvedSearchParams = await searchParams;
  const pageParam = resolvedSearchParams?.page;
  const currentPage =
    typeof pageParam === "string" ? parseInt(pageParam, 10) : 1;

  return (
    <div className="container mx-auto px-4 py-8 mt-18">
      <Cards page={currentPage} />
    </div>
  );
}
