<script>
  import ThemeToggle from "./ThemeToggle.svelte";
</script>

<header>
  <a href="/" class="logo">zemse's writing across the web</a>
  <div class="toggle">
    <ThemeToggle />
  </div>
</header>

<style>
  header {
    text-align: center;
    padding: 2.5rem 1rem 1.5rem;
    position: relative;
  }

  .logo {
    font-size: 1.75rem;
    font-weight: 700;
    color: var(--text);
    text-decoration: none;
  }

  .toggle {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
</style>
