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

// Pagination metadata interface
export interface PaginationMeta {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

// API response interface
export interface BlogResponse {
  data: BlogPost[];
  meta: {
    pagination: PaginationMeta;
  };
}

// Lightweight date formatting
export function formatDate(isoDate: string) {
  const date = new Date(isoDate);
  const diff = Date.now() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// features/post/hook/ApiHook.ts
export async function getBlogPosts(
  page = 1,
  pageSize = 9
): Promise<{ blogs: BlogItem[]; pagination: PaginationMeta }> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs?fields[0]=title&fields[1]=slug&fields[2]=id&fields[3]=createdAt&populate[cover_image][fields][0]=url&populate[auther][fields][0]=name&populate[tags][fields][0]=tag&pagination[page]=${page}&pagination[pageSize]=${pageSize}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
        },
        next: { revalidate: 3600 }, // ISR: Revalidate every hour
      }
    );

    const { data, meta } = (await response.json()) as BlogResponse;

    const blogs = data?.map((item: BlogPost) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      image: item.cover_image?.url || "/fallback.jpg",
      author: item.auther?.name || "Unknown",
      time: formatDate(item.createdAt),
      tags: item.tags?.map((t) => t.tag) || [],
    }));

    return {
      blogs,
      pagination: meta.pagination,
    };
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return {
      blogs: [],
      pagination: {
        page: 1,
        pageSize,
        pageCount: 0,
        total: 0,
      },
    };
  }
}
