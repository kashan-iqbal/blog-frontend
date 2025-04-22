export interface BlogDetail {
  data: data[];
  meta: Meta;
}

export interface data {
  id: number;
  documentId: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  locale: string;
  likes: number;
  slug: string;
  comments: null;
  cover_image: Image;
  auther: Auther;
  catageory: Auther;
  tags: Tag[];
  seo: SEO[];
}

export interface Auther {
  id: number;
  documentId: string;
  name: string;
  profile_image?: Image;
}

export interface Image {
  id: number;
  documentId: string;
  url: string;
  formats: CoverImageFormats;
}

export interface CoverImageFormats {
  large?: Large;
  small: Large;
  medium: Large;
  thumbnail: Large;
}

export interface Large {
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
}

export enum EXT {
  Jpg = ".jpg",
  PNG = ".png",
}

export enum MIME {
  ImageJPEG = "image/jpeg",
  ImageWebp = "image/webp",
}

export interface SEO {
  id: number;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  metaRobots: string;
  metaViewport: string;
  canonicalURL: string;
  structuredData: StructuredData;
  metaImage: Image;
  openGraph: OpenGraph;
}

export interface OpenGraph {
  id: number;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  ogType: string;
  ogImage: OgImage;
}

export interface OgImage {
  id: number;
  documentId: string;
  formats: OgImageFormats;
}

export interface OgImageFormats {
  small: Large;
  thumbnail: Large;
}

export interface StructuredData {
  url: string;
  "@type": string;
  image: string;
  author: Author;
  "@context": string;
  headline: string;
  publisher: Publisher;
  description: string;
  dateModified: Date;
  datePublished: Date;
  mainEntityOfPage: string;
}

export interface Author {
  name: string;
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
