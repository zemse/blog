export interface BlogPost {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  tags: string[];
  platform: "devto" | "medium";
  coverImage?: string;
  reactionsCount?: number;
  commentsCount?: number;
}
