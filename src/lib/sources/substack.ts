import { XMLParser } from "fast-xml-parser";
import type { BlogPost } from "./types";
import { config } from "$lib/config";

export async function fetchSubstackPosts(): Promise<BlogPost[]> {
  const res = await fetch(`https://${config.username}.substack.com/feed`);

  if (!res.ok) {
    console.error(`Substack RSS error: ${res.status}`);
    return [];
  }

  const xml = await res.text();
  const parser = new XMLParser({ ignoreAttributes: false });
  const feed = parser.parse(xml);

  const items = feed?.rss?.channel?.item;
  if (!items) return [];

  const posts = Array.isArray(items) ? items : [items];

  return posts.map((item: Record<string, unknown>) => {
    const content = String(item["content:encoded"] ?? "");
    const imgMatch = content.match(/<img[^>]+src="([^"]+)"/);

    const enclosure = item["enclosure"] as Record<string, string> | undefined;
    const enclosureUrl = enclosure?.["@_url"];

    const description = String(item["description"] ?? "")
      .replace(/<[^>]+>/g, "")
      .slice(0, 200);

    return {
      title: String(item["title"] ?? ""),
      description,
      url: String(item["link"] ?? ""),
      publishedAt: new Date(String(item["pubDate"] ?? "")).toISOString(),
      tags: [] as string[],
      platform: "substack" as const,
      coverImage: enclosureUrl || imgMatch?.[1],
    };
  });
}
