import type { BlogPost } from "./types";
import { config } from "$lib/config";

interface DiscoursePost {
  id: number;
  topic_id: number;
  like_count: number;
  blurb: string;
  created_at: string;
}

interface DiscourseTopic {
  id: number;
  title: string;
  slug: string;
  tags: string[];
  posts_count: number;
  category_id: number;
}

interface DiscourseSearchResponse {
  posts: DiscoursePost[];
  topics: DiscourseTopic[];
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}

export async function fetchDiscoursePosts(
  baseUrl: string,
  platform: BlogPost["platform"],
): Promise<BlogPost[]> {
  const query = `@${config.username} in:first order:latest`;
  const res = await fetch(
    `${baseUrl}/search.json?q=${encodeURIComponent(query)}`,
  );

  if (!res.ok) {
    console.error(`Discourse API error (${baseUrl}): ${res.status}`);
    return [];
  }

  const data: DiscourseSearchResponse = await res.json();
  if (!data.posts || !data.topics) return [];

  const topicMap = new Map<number, DiscourseTopic>();
  for (const topic of data.topics) {
    topicMap.set(topic.id, topic);
  }

  return data.posts
    .map((post) => {
      const topic = topicMap.get(post.topic_id);
      if (!topic) return null;

      const description = truncate(stripHtml(post.blurb), 200);

      return {
        title: topic.title,
        description,
        url: `${baseUrl}/t/${topic.slug}/${topic.id}`,
        publishedAt: post.created_at,
        tags: topic.tags ?? [],
        platform,
        reactionsCount: post.like_count,
        commentsCount: Math.max(0, topic.posts_count - 1),
      } satisfies BlogPost;
    })
    .filter((p): p is BlogPost => p !== null);
}
