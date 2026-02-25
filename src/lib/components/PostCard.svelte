<script lang="ts">
  import type { BlogPost } from "$lib/sources/types";
  import { config } from "$lib/config";

  const { post }: { post: BlogPost } = $props();

  const platformConfig = $derived(config.platforms[post.platform]);
  const formattedDate = $derived(
    new Date(post.publishedAt).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  );
</script>

<article class="card">
  <div class="body">
    <div class="meta">
      <time datetime={post.publishedAt}>{formattedDate}</time>
      <span
        class="badge"
        class:devto={post.platform === "devto"}
        class:medium={post.platform === "medium"}
        class:ethmagicians={post.platform === "ethmagicians"}
        class:ethresearch={post.platform === "ethresearch"}
      >
        {platformConfig.label}
      </span>
    </div>
    <h2 class="title">{post.title}</h2>
    <p class="description">{post.description}</p>
    {#if post.tags.length > 0}
      <div class="tags">
        {#each post.tags.slice(0, 4) as tag}
          <span class="tag">#{tag}</span>
        {/each}
      </div>
    {/if}
    {#if post.reactionsCount != null || post.commentsCount != null}
      <div class="stats">
        {#if post.reactionsCount != null}
          <span class="stat">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              ><path
                d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
              /></svg
            >
            {post.reactionsCount}
          </span>
        {/if}
        {#if post.commentsCount != null}
          <span class="stat">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              ><path
                d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
              /></svg
            >
            {post.commentsCount}
          </span>
        {/if}
      </div>
    {/if}
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      class="read-link"
      class:devto={post.platform === "devto"}
      class:medium={post.platform === "medium"}
      class:ethmagicians={post.platform === "ethmagicians"}
      class:ethresearch={post.platform === "ethresearch"}
    >
      Read on {platformConfig.label}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        ><path
          d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"
        /><polyline points="15 3 21 3 21 9" /><line
          x1="10"
          y1="14"
          x2="21"
          y2="3"
        /></svg
      >
    </a>
  </div>
  {#if post.coverImage}
    <img src={post.coverImage} alt="" class="cover" loading="lazy" />
  {/if}
</article>

<style>
  .card {
    display: flex;
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 12px;
    overflow: hidden;
    transition: box-shadow 0.2s;
  }

  .card:hover {
    box-shadow: 0 4px 20px var(--shadow);
  }

  .body {
    flex: 1;
    min-width: 0;
    padding: 1.25rem;
  }

  .cover {
    width: 180px;
    flex-shrink: 0;
    object-fit: cover;
    align-self: stretch;
  }

  @media (max-width: 500px) {
    .cover {
      width: 120px;
    }
  }

  .meta {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.85rem;
    color: var(--text-muted);
    margin-bottom: 0.5rem;
  }

  .badge {
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.15rem 0.5rem;
    border-radius: 4px;
    color: #fff;
  }

  .badge.devto {
    background: var(--devto-color);
  }

  .badge.medium {
    background: var(--medium-color);
  }

  .badge.ethmagicians {
    background: var(--ethmagicians-color);
  }

  .badge.ethresearch {
    background: var(--ethresearch-color);
  }

  .title {
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.3;
    margin: 0 0 0.5rem;
    color: var(--text);
  }

  .description {
    color: var(--text-muted);
    font-size: 0.9rem;
    line-height: 1.5;
    margin: 0 0 0.75rem;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    margin-bottom: 1rem;
  }

  .tag {
    font-size: 0.8rem;
    color: var(--text-muted);
    background: var(--tag-bg);
    padding: 0.15rem 0.5rem;
    border-radius: 4px;
  }

  .stats {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 0.85rem;
    color: var(--text-muted);
    margin-bottom: 1rem;
  }

  .stat {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
  }

  .read-link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.9rem;
    font-weight: 500;
    text-decoration: none;
    padding: 0.4rem 0.85rem;
    border-radius: 6px;
    color: #fff;
    transition: opacity 0.2s;
  }

  .read-link:hover {
    opacity: 0.85;
  }

  .read-link.devto {
    background: var(--devto-color);
  }

  .read-link.medium {
    background: var(--medium-color);
  }

  .read-link.ethmagicians {
    background: var(--ethmagicians-color);
  }

  .read-link.ethresearch {
    background: var(--ethresearch-color);
  }
</style>
