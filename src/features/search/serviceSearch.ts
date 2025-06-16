export interface Main {
  data: Datum[];
  meta: Meta;
}

export interface Datum {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  createdAt: Date;
  auther: Auther | null;
  tags: TagElement[];
}

interface Auther {
  id: number;
  documentId: AutherDocumentID;
  name: Name;
}

enum AutherDocumentID {
  G26Ha6Gpcj901E0Zeeeb04Is = "g26ha6gpcj901e0zeeeb04is",
}

enum Name {
  KashanIqbal = "kashan iqbal",
}

interface TagElement {
  id: number;
  documentId: TagDocumentID;
  tag: TagEnum;
}

enum TagDocumentID {
  Fsjdu2K91Ej2I1Mwg9Svwqze = "fsjdu2k91ej2i1mwg9svwqze",
  Jlfciw93Fo9Pd4A4Uhbwhked = "jlfciw93fo9pd4a4uhbwhked",
  Kizd82Agk54Gg7U0Iykt4Xqu = "kizd82agk54gg7u0iykt4xqu",
}

enum TagEnum {
  AI = "ai",
  NodeJS = "node js",
  ReactJS = "react js",
}

interface Meta {
  pagination: Pagination;
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export const getblogSearch = async (): Promise<Main> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs?fields[0]=title&fields[1]=slug&fields[2]=id&fields[3]=createdAt&populate[auther][fields][0]=name&populate[tags][fields][0]=tag`,
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      },

      next: {
        revalidate: 86400, // Cache for 1 day
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch blog data");
  }

  const data: Main = await res.json();
  return data;
};
