import axios from "axios";
import { Heart } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export interface BlogDetail {
  data: data[];
  meta: Meta;
}

export interface data {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  createdAt: Date;
  content: Content;
  cover_image: CoverImage;
  catageory: Catageory;
  tags: Tag[];
  auther: Auther;
}

export interface Catageory {
  id: number;
  documentId: string;
  name: string;
}

export interface Content {
  type: string;
  children: Child[];
}
export interface Auther {
  id: number;
  documentId: string;
  name: string;
}

export interface Child {
  text: string;
  type: string;
}

export interface CoverImage {
  id: number;
  documentId: string;
  url: string;
  formats: Formats;
}

export interface Formats {
  small: Medium;
  medium: Medium;
  thumbnail: Medium;
}

export interface Medium {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}

export interface Tag {
  id: number;
  documentId: string;
  tag: string;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

const RelatedBlog = ({ blog, catageory, slug }) => {
  const [relatedBlogs, setRelatedBlogs] = useState<data[]>([]);

  useEffect(() => {
    if (!catageory?.name) return;

    console.log(catageory.name);

    const fetchRelatedBlogs = async () => {
      try {
        const { data } = await axios.get<BlogDetail>(
          `http://localhost:1337/api/blogs`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
            },
            params: {
              "filters[catageory][name][$eq]": catageory.name,
              "filters[slug][$ne]": slug, // <-- exclude this slug
              "fields[0]": "title",
              "fields[1]": "slug",
              "fields[2]": "id",
              "fields[3]": "createdAt",
              "fields[4]": "content",

              "populate[cover_image][fields][0]": "url",
              "populate[cover_image][fields][1]": "formats",
              "populate[catageory][fields][0]": "name",
              "populate[tags][fields][0]": "tag",
              "populate[auther][fields][1]": "name",
            },
          }
        );

        console.log("Related Blogs API Response:", data);
        setRelatedBlogs(data.data);
      } catch (err) {
        console.error("Axios error fetching related blogs:", err);
      }
    };

    fetchRelatedBlogs();
  }, [catageory]);

  console.log(relatedBlogs, "relatedBlogs");

  if (relatedBlogs.length === 0) {
    return (
      <div className="text-center text-gray-500">No related blogs found.</div>
    );
  }

  return (
    <>
      {relatedBlogs.length > 0 &&
        relatedBlogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-all"
          >
            <Image
              src={`${blog.cover_image.url}`}
              alt={blog.title}
              height={100}
              width={100}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2 line-clamp-2">
                {blog.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {blog.content.children[0].text}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {/* {blog.auther.name} */}
                </span>
                <div className="flex items-center text-gray-500 text-sm">
                  <Heart size={14} className="mr-1" />
                  {/* {blog.likes} */}
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default RelatedBlog;
