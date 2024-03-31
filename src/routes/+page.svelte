<script lang="ts">
  import SelectFile from '$lib/components/SelectFile.svelte';
  import ConvertedHtml from '$lib/components/ConvertedHtml.svelte';

  let files: File[];
</script>

<svelte:head>
  <title>Arc Bookmarks Export</title>
  <meta name="description" content="Export your arc bookmarks to normal html format." />
</svelte:head>

<main>
  <section>
    <h1><span>Step 1:</span> Locate and choose StorableSidebar.json of Arc Browser</h1>
    <SelectFile bind:files />
  </section>
  <section>
    <h1><span>Step 2:</span> Download converted bookmarks.</h1>
    <ConvertedHtml {files} />
  </section>
  <section>
    <h1><span>Step 3:</span> Import to other browser.</h1>
    <p>Select the file you just downloaded in Chrome's Import Bookmarks feature.</p>
  </section>
</main>

<style>
  main {
    margin: 2.5em;
    display: flex;
    flex-direction: column;
    gap: 2em;
  }

  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    gap: 16px;
  }

  section h1 {
    font-size: 1em;
    font-weight: 600;
  }

  section h1 span {
    font-size: 1.5em;
    padding-inline-end: 0.4em;
  }
</style>
