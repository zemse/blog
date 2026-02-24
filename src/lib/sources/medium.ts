import { XMLParser } from "fast-xml-parser";
import type { BlogPost } from "./types";
import { config } from "$lib/config";

export async function fetchMediumPosts(): Promise<BlogPost[]> {
  const res = await fetch(`https://medium.com/feed/@${config.username}`);

  if (!res.ok) {
    console.error(`Medium RSS error: ${res.status}`);
    return [];
  }

  const xml = await res.text();
  const parser = new XMLParser({ ignoreAttributes: false });
  const feed = parser.parse(xml);

  const items = feed?.rss?.channel?.item;
  if (!items) return [];

  const posts = Array.isArray(items) ? items : [items];

  return posts.map((item: Record<string, unknown>) => {
    const categories = item["category"];
    const tags: string[] = Array.isArray(categories)
      ? categories.map(String)
      : categories
        ? [String(categories)]
        : [];

    const content = String(item["content:encoded"] ?? "");
    const imgMatch = content.match(/<img[^>]+src="([^"]+)"/);

    const description = String(item["description"] ?? "")
      .replace(/<[^>]+>/g, "")
      .slice(0, 200);

    return {
      title: String(item["title"] ?? ""),
      description,
      url: String(item["link"] ?? ""),
      publishedAt: new Date(String(item["pubDate"] ?? "")).toISOString(),
      tags,
      platform: "medium" as const,
      coverImage: imgMatch?.[1],
    };
  });
}
