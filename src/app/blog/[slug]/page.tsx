import { Metadata } from "next";
import BlogDetail from "./BlogDetail";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (!params?.slug) {
    return {
      title: "Blog Not Found",
      description: "This blog post could not be found.",
    };
  }

  const res = await fetch(
    `http://localhost:1337/api/blogs?filters[slug][$eq]=${params.slug}&populate=seo`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    return {
      title: "Blog Not Found",
      description: "Unable to load blog details at the moment.",
    };
  }

  const json = await res.json();
  const seo = json?.data?.[0]?.seo?.[0];

  return {
    title: seo?.metaTitle || "Default Blog Title",
    description: seo?.metaDescription || "Default Description",
    keywords: seo?.keywords || "",
    alternates: {
      canonical:
        seo?.canonicalURL || `https://yourdomain.com/blog/${params.slug}`,
    },
    openGraph: {
      title: seo?.metaTitle || "Default Blog Title",
      description: seo?.metaDescription || "Default Description",
      url: `https://yourdomain.com/blog/${params.slug}`,
      images: [
        {
          url: seo?.image?.url || "https://yourdomain.com/default-image.jpg",
          width: 800,
          height: 600,
        },
      ],
    },
  };
}

export default function Page({ params }: Props) {
  return <BlogDetail slug={params.slug} />;
}
