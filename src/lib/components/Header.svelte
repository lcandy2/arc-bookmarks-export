<script>
  import github from '$lib/images/github.svg';
</script>

<header>
  <a href="/"><h1>Arc Bookmarks Export</h1></a>

  <a
    href="https://github.com/lcandy2/arc-bookmarks-export"
    target="_blank"
    class="inline-flex flex-row items-center gap-1"
  >
    <img
      src={github}
      alt="GitHub"
      style="filter: invert(87%) sepia(16%) saturate(257%) hue-rotate(200deg) brightness(104%) contrast(104%);"
      height="28"
      width="28"
    /><span class="hidden sm:block">Star on GitHub</span>
  </a>
</header>

<style>
  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-inline: 2em;
    justify-content: space-between;
    background-color: var(--arc-color-blue);
    color: var(--arc-color-white);
    height: 6em;
  }

  h1 {
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 500;
    color: var(--arc-color-white);
  }

  a {
    padding: 8px 10px;
    border: 1px solid rgba(0, 0, 0, 0);
    border-radius: 8px;
    transition:
      transform 150ms ease,
      background 150ms ease;
    text-decoration: none;
    min-height: 28px;
  }

  a:hover {
    background: rgba(23, 3, 148, 0.5);
    border-color: transparent;
    transform: scale(1.05) translate3d(0, 0, 0) perspective(1px);
  }
</style>
