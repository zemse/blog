export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "...";
}

export function extractFirstImage(html: string): string | undefined {
  const match = html.match(/<img[^>]+src="([^"]+)"/);
  return match?.[1];
}

export function safeIsoDate(value: unknown): string {
  const date = new Date(String(value ?? ""));
  if (isNaN(date.getTime())) return new Date().toISOString();
  return date.toISOString();
}
