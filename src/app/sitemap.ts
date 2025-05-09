import { BlogPost } from "@/features/post/hook/ApiHook";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs?fields=slug`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      },
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    }
  );

  const { data } = await res.json();

  const baseUrl =
    process.env.NEXT_PUBLIC_FRONTEND_URL || "https://yourdomain.com";

  const routes = data.map((post: BlogPost) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date().toISOString(),
  }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date().toISOString(),
    },
    ...routes,
  ];
}
