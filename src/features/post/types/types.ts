export interface BlogCard {
  id: number;
  title: string;
  description: string;
  image: string;
  author: string;
  time: string;
  tags: string[];
  slug: string;
  likes: number;
}

interface CoverImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  sizeInBytes: number;
}
interface CoverImage {
  id: number;
  documentId: string;
  url: string;
  formats: {
    large: CoverImageFormat;
    small: CoverImageFormat;
    medium: CoverImageFormat;
    thumbnail: CoverImageFormat;
  };
}

// Author
interface Author {
  id: number;
  documentId: string;
  name: string;
}

// Category
interface Category {
  id: number;
  documentId: string;
  name: string;
}

interface Tag {
  id: number;
  documentId: string;
  name: string;
}

// Blog Post
interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  cover_image: CoverImage;
  auther: Author;
  catageories: Category[];
  tags: Tag[];
}

export type BlogCardResponse = BlogPost[];
