import type { BlogPost } from "./types";
import { config } from "$lib/config";

interface DevtoArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  published_at: string;
  tag_list: string[];
  cover_image: string | null;
  positive_reactions_count: number;
  comments_count: number;
}

interface DevtoArticleDetail {
  body_html: string;
}

async function extractFirstImage(articleId: number): Promise<string | undefined> {
  try {
    const res = await fetch(`https://dev.to/api/articles/${articleId}`);
    if (!res.ok) return undefined;
    const detail: DevtoArticleDetail = await res.json();
    const match = detail.body_html.match(/<img[^>]+src="([^"]+)"/);
    return match?.[1];
  } catch {
    return undefined;
  }
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

  const posts: BlogPost[] = articles.map((a) => ({
    title: a.title,
    description: a.description,
    url: a.url,
    publishedAt: a.published_at,
    tags: a.tag_list,
    platform: "devto" as const,
    coverImage: a.cover_image ?? undefined,
    reactionsCount: a.positive_reactions_count,
    commentsCount: a.comments_count,
  }));

  const noCover = articles
    .map((a, i) => ({ id: a.id, index: i }))
    .filter((_, i) => !posts[i].coverImage);

  if (noCover.length > 0) {
    const images = await Promise.allSettled(
      noCover.map((a) => extractFirstImage(a.id)),
    );
    noCover.forEach(({ index }, i) => {
      const result = images[i];
      if (result.status === "fulfilled" && result.value) {
        posts[index].coverImage = result.value;
      }
    });
  }

  return posts;
}
