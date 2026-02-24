<script lang="ts">
	const { page, totalPages }: { page: number; totalPages: number } = $props();
</script>

{#if totalPages > 1}
	<nav class="pagination">
		{#if page > 1}
			<a href="?page={page - 1}" class="btn">Prev</a>
		{/if}

		{#each Array.from({ length: totalPages }, (_, i) => i + 1) as p}
			{#if p === page}
				<span class="btn current">{p}</span>
			{:else}
				<a href="?page={p}" class="btn">{p}</a>
			{/if}
		{/each}

		{#if page < totalPages}
			<a href="?page={page + 1}" class="btn">Next</a>
		{/if}
	</nav>
{/if}

<style>
	.pagination {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 0.4rem;
		padding: 2rem 0;
		flex-wrap: wrap;
	}

	.btn {
		padding: 0.4rem 0.75rem;
		border-radius: 6px;
		font-size: 0.9rem;
		text-decoration: none;
		color: var(--text);
		background: var(--card-bg);
		border: 1px solid var(--border);
		transition: background 0.2s;
	}

	.btn:hover {
		background: var(--tag-bg);
	}

	.btn.current {
		background: var(--text);
		color: var(--bg);
		font-weight: 600;
		border-color: var(--text);
	}
</style>
