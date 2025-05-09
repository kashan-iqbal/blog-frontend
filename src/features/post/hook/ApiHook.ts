export interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: {
    type: string;
    children: Array<{
      text: string;
    }>;
  };
  cover_image: {
    id: number;
    documentId: string;
    url: string;
    formats?: Record<string, { url: string; width?: number; height?: number }>;
  };
  auther: {
    id: number;
    documentId: string;
    name: string;
  };
  catageory: {
    id: number;
    documentId: string;
    name: string;
  };
  tags: Array<{
    id: number;
    tag: string;
    documentId: string;
  }>;
  createdAt: string;
}

// types/types.ts
export interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: {
    type: string;
    children: Array<{
      text: string;
    }>;
  };
  cover_image: {
    id: number;
    documentId: string;
    url: string;
    formats?: Record<string, { url: string; width?: number; height?: number }>;
  };
  auther: {
    id: number;
    documentId: string;
    name: string;
  };
  tags: Array<{
    id: number;
    tag: string;
    documentId: string;
  }>;
  createdAt: string;
}

// Interface for the transformed blog data
export interface BlogItem {
  id: number;
  title: string;
  slug: string;
  image: string;
  author: string;
  time: string;
  tags: string[];
}
export async function getBlogPosts(): Promise<BlogItem[]> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs?fields[0]=title&fields[1]=slug&fields[2]=id&fields[3]=createdAt&populate[cover_image][fields][0]=url&populate[auther][fields][0]=name&populate[tags][fields][0]=tag`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
        next: { revalidate: 3600 }, // ISR: Revalidate every hour
      }
    );

    const { data } = await response.json();
    return data?.map((item: BlogPost) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      image: item.cover_image?.url || "/fallback.jpg",
      author: item.auther?.name || "Unknown",
      time: formatDate(item.createdAt),
      tags: item.tags?.map((t) => t.tag) || [],
    }));
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return [];
  }
}

// Lightweight date formatting
function formatDate(isoDate: string) {
  const date = new Date(isoDate);
  const diff = Date.now() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
