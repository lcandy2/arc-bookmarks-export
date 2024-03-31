<script>
  import Header from '$lib/components/Header.svelte';
  import './styles.css';
</script>

<Header />

<slot />

<footer>
  <p>
    by <a href="https://github.com/lcandy2" target="_blank">lcandy2</a> with ♡ | the convert progress
    runs offline ✓
  </p>
</footer>

<style>
  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
  }

  footer a {
    font-weight: bold;
  }

  @media (min-width: 480px) {
    footer {
      padding: 12px 0;
    }
  }
</style>
