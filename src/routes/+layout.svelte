<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';

	const { children } = $props();
</script>

<svelte:head>
	<title>zemse's writing across the web</title>
	<meta name="description" content="zemse's writing across the web" />
</svelte:head>

<Header />
<main>
	{@render children()}
</main>
<footer>
	<p>&copy; {new Date().getFullYear()} zemse</p>
</footer>

<style>
	main {
		max-width: 720px;
		margin: 0 auto;
		padding: 0 1rem 2rem;
	}

	footer {
		text-align: center;
		padding: 1.5rem;
		color: var(--text-muted);
		font-size: 0.85rem;
		border-top: 1px solid var(--border);
	}
</style>
