"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { BlogDetail } from "./Types";

export const useGetBlogDetail = (slug: string) => {
  const [data, setData] = useState<BlogDetail | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchBlog = async () => {
      const token = process.env.NEXT_PUBLIC_TOKEN;
      const url = `http://localhost:1337/api/blogs?filters[slug][$eq]=${slug}&populate[cover_image][fields][0]=url&populate[cover_image][fields][1]=formats&populate[auther][fields][0]=name&populate[auther][populate][profile_image][fields][0]=url&populate[auther][populate][profile_image][fields][1]=formats&populate[catageory][fields][0]=name&populate[tags][fields][0]=tag&populate[seo][populate][metaImage][fields][0]=url&populate[seo][populate][metaImage][fields][1]=formats&populate[seo][populate][openGraph][populate][ogImage][fields][1]=formats`;

      try {
        const { data } = await axios.get<BlogDetail>(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(data as BlogDetail);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error(
            "Axios error fetching blog:",
            err.response?.data || err.message
          );
          setError(err.response?.data || err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  return { data, loading, error };
};
