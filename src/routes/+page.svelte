<script lang="ts">
	import PostCard from '$lib/components/PostCard.svelte';
	import Pagination from '$lib/components/Pagination.svelte';

	const { data } = $props();
</script>

<div class="posts">
	{#each data.posts as post (post.url)}
		<PostCard {post} />
	{/each}
</div>

{#if data.posts.length === 0}
	<p class="empty">No posts found.</p>
{/if}

<Pagination page={data.page} totalPages={data.totalPages} />

<style>
	.posts {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.empty {
		text-align: center;
		color: var(--text-muted);
		padding: 3rem 0;
	}
</style>
