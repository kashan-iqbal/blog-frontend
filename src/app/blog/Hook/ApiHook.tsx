export interface Main {
  data: data[];
  meta: Meta;
}

export interface data {
  id: number;
  documentId: string;
  title: string;
  likes: number;
  slug: string;
  comments: null;
  content: [];
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: string;
  cover_image: CoverImageClass;
  auther: Auther;
  catageory: Auther;
  tags: Tag[];
  seo: SEO[];
}

export interface Auther {
  id: number;
  documentId: string;
  name: string;
  profile_image?: ProfileImageClass;
}

export interface ProfileImageClass {
  id: number;
  documentId: string;
  url: string;
  formats: ProfileImageFormats;
}

export interface ProfileImageFormats {
  small: Medium;
  thumbnail: Medium;
}

export interface Medium {
  ext: EXT;
  url: string;
  hash: string;
  mime: MIME;
  name: string;
  path: null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
  provider_metadata: ProviderMetadata;
}

export enum EXT {
  JPEG = ".jpeg",
  PNG = ".png",
}

export enum MIME {
  ImageJPEG = "image/jpeg",
  ImageWebp = "image/webp",
}

export interface ProviderMetadata {
  public_id: string;
  resource_type: ResourceType;
}

export enum ResourceType {
  Image = "image",
}

export interface Content {
  type: ContentType;
  children: Child[];
  language?: Language;
}

export interface Child {
  text: string;
  type: ChildType;
}

export enum ChildType {
  Text = "text",
}

export enum Language {
  Javascript = "javascript",
  Plaintext = "plaintext",
}

export enum ContentType {
  Code = "code",
  Paragraph = "paragraph",
}

export interface CoverImageClass {
  id: number;
  documentId: string;
  url?: string;
  formats: CoverImageFormats;
}

export interface CoverImageFormats {
  small: Medium;
  medium: Medium;
  thumbnail: Medium;
}

export interface SEO {
  id: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  metaRobots: string;
  metaViewport: string;
  image: string;
  canonicalURL: string;
  structuredData: StructuredData;
  metaImage: ProfileImageClass;
  openGraph: OpenGraph;
}

export interface OpenGraph {
  id: number;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  ogType: string;
  ogImage: CoverImageClass;
}

export interface StructuredData {
  "@type": string;
  image: string;
  author: Author;
  "@context": string;
  headline: string;
  publisher: Publisher;
  description: string;
  dateModified: Date;
  datePublished: Date;
  mainEntityOfPage: MainEntityOfPage;
}

export interface Author {
  name: string;
  "@type": string;
}

export interface MainEntityOfPage {
  "@id": string;
  "@type": string;
}

export interface Publisher {
  logo: Logo;
  name: string;
  "@type": string;
}

export interface Logo {
  url: string;
  "@type": string;
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

// utils/api.ts (Recommended location for API helpers)

export async function GetBlogDetail(slug: string): Promise<Main | null> {
  const endpoint =
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs` +
    `?filters[slug][$eq]=${encodeURIComponent(slug)}` +
    `&populate[cover_image][fields][0]=url` +
    `&populate[cover_image][fields][1]=formats` +
    `&populate[auther][fields][0]=name` +
    `&populate[auther][populate][profile_image][fields][0]=url` +
    `&populate[auther][populate][profile_image][fields][1]=formats` +
    `&populate[catageory][fields][0]=name` +
    `&populate[tags][fields][0]=tag` +
    `&populate[seo][populate][metaImage][fields][0]=url` +
    `&populate[seo][populate][metaImage][fields][1]=formats` +
    `&populate[seo][populate][openGraph][populate][ogImage][fields][1]=formats`;

  try {
    const res = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      },
      next: { revalidate: 60 }, // ISR: revalidate every 60 seconds
    });

    if (!res.ok) {
      console.error(
        `Failed to fetch blog detail for slug: ${slug} - Status: ${res.status}`
      );
      return null;
    }

    const json = await res.json();

    if (!json?.data || !Array.isArray(json.data)) {
      console.warn("Invalid blog detail response structure", json);
      return null;
    }
    return json;
  } catch (error) {
    console.error("Error fetching blog detail:", error);
    return null;
  }
}
