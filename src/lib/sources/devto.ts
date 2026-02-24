import type { BlogPost } from "./types";
import { config } from "$lib/config";

interface DevtoArticle {
  title: string;
  description: string;
  url: string;
  published_at: string;
  tag_list: string[];
  cover_image: string | null;
}

export async function fetchDevtoPosts(): Promise<BlogPost[]> {
  const res = await fetch(
    `https://dev.to/api/articles?username=${config.username}&per_page=1000`,
  );

  if (!res.ok) {
    console.error(`Dev.to API error: ${res.status}`);
    return [];
  }

  const articles: DevtoArticle[] = await res.json();

  return articles.map((a) => ({
    title: a.title,
    description: a.description,
    url: a.url,
    publishedAt: a.published_at,
    tags: a.tag_list,
    platform: "devto" as const,
    coverImage: a.cover_image ?? undefined,
  }));
}
