import type { PageServerLoad } from "./$types";
import { fetchDevtoPosts } from "$lib/sources/devto";
import { fetchMediumPosts } from "$lib/sources/medium";
import { config } from "$lib/config";

export const load: PageServerLoad = async ({ url, setHeaders }) => {
  setHeaders({
    "Cache-Control": `public, s-maxage=${config.cacheTtl}`,
  });

  const page = Math.max(1, Number(url.searchParams.get("page")) || 1);

  const [devtoPosts, mediumPosts] = await Promise.all([
    fetchDevtoPosts(),
    fetchMediumPosts(),
  ]);

  const allPosts = [...devtoPosts, ...mediumPosts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  const totalPages = Math.max(
    1,
    Math.ceil(allPosts.length / config.postsPerPage),
  );
  const clampedPage = Math.min(page, totalPages);
  const start = (clampedPage - 1) * config.postsPerPage;
  const posts = allPosts.slice(start, start + config.postsPerPage);

  return {
    posts,
    page: clampedPage,
    totalPages,
  };
};
