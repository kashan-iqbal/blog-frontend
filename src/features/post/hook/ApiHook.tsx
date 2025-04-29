import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { BlogCard } from "../types/types";

dayjs.extend(relativeTime);

export const useBlogPosts = () => {
  const [blogs, setBlogs] = useState<BlogCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  interface BlogPost {
    id: number;
    documentId: string;
    title: string;
    slug: string;
    content: {
      type: string;
      children: Array<{
        text: string; // Assuming 'text' is the property you are accessing
      }>;
    };
    cover_image: {
      id: number;
      documentId: string;
      url: string;
      formats?: Record<
        string,
        { url: string; width?: number; height?: number }
      >; // Replace with the actual structure of your image formats
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
      name: string;
      documentId: string;
    }>;
    createdAt: string; // ISO date string
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "http://localhost:1337/api/blogs?fields[0]=title&fields[1]=slug&fields[2]=id&fields[3]=createdAt&fields[4]=content&populate[cover_image][fields][0]=url&populate[cover_image][fields][1]=formats&populate[auther][fields][0]=name&populate[catageory][fields][0]=name&populate[tags][fields][0]=tag",
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
            },
          }
        );
        console.log(data);
        const formattedBlog: BlogCard[] = data.data.map((item: BlogPost) => {
          return {
            id: item.id,
            title: item.title,
            description: item.content.children[0].text,
            slug: item.slug,
            image: item.cover_image?.url || "/fallback-image.jpg",
            author: item.auther?.name || "Unknown",
            time: dayjs(item.createdAt).fromNow(),
            tags: item?.tags?.map((tags) => tags?.name) || [],
          };
        });
        setBlogs(formattedBlog);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.message || "Network error");
        } else {
          setError("Unexpected error");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return { blogs, loading, error };
};
