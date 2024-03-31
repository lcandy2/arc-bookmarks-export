<script lang="ts">
  import { Textarea } from 'flowbite-svelte';
  import convertBookmarks from '$lib/convert';

  export let files: File[] = [];
  let html = '';
  let href = '';
  let filename = '';

  $: disabled = !(html !== '' && files.length > 0 && href !== '' && filename !== '');

  const textareaprops = {
    id: 'message',
    name: 'message',
    label: 'Your message',
    rows: 4,
    placeholder: 'Leave a comment...',
    readonly: true
  };

  $: if (files.length > 0) {
    convertBookmarks(files)
      .then((result) => {
        html = result;
        const blob = new Blob([html], { type: 'text/html' });
        href = URL.createObjectURL(blob);
        const currentDate = new Date();
        const formattedDate = `${currentDate.getMonth() + 1}_${currentDate.getDate()}_${currentDate.getFullYear()}`;
        filename = `Arc_bookmarks_${formattedDate}.html`;
      })
      .catch((error) => {
        console.error('Conversion failed:', error);
        html = 'Error converting bookmarks.';
      });
  }
</script>

<Textarea unWrappedClass="min-w-64 w-64 max-h-36 resize-x" {...textareaprops} bind:value={html} />
<a {href} target="_blank" download={filename}>
  <button {disabled}>Download HTML Bookmarks</button>
</a>

<style>
  button {
    font-size: 12px;
    background-color: var(--arc-color-brand-blue);
    color: var(--arc-color-white);
    padding: 4px 20px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 5px;
    border: none;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 3.5em;
    letter-spacing: -0.01em;
    white-space: nowrap;
    backface-visibility: hidden;
    -webkit-font-smoothing: subpixel-antialiased;
    will-change: transform;
    transition:
      transform 150ms ease 0s,
      box-shadow 0.15s ease-out 0s;
    text-decoration: none !important;
    border-radius: 10px;
    font-family: var(--fonts-referralSans);
    font-weight: 600;
  }

  button:hover {
    box-shadow: rgba(0, 0, 0, 0.2) 0px 7px 15px;
    transform: scale(1.02);
  }

  button:disabled {
    background-color: var(--arc-color-brand-blue40);
    cursor: not-allowed;
  }

  button:disabled:hover {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 5px;
    transform: scale(1);
  }
</style>
