<script lang="ts">
  import { Dropzone } from 'flowbite-svelte';

  let file: string[] = [];
  export let files: File[];

  const addFiles = (f: File[]) => {
    files = f;
    file = f.map((file: File) => file.name);
  };

  const dropHandle = (event: DragEvent) => {
    event.preventDefault();
    if (!event.dataTransfer) return;

    const files = event.dataTransfer.items
      ? Array.from(event.dataTransfer.items)
          .filter((item) => item.kind === 'file')
          .map((item) => item.getAsFile())
          .filter((file): file is File => file !== null)
      : Array.from(event.dataTransfer.files);

    addFiles(files);
  };

  const handleChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;

    const files = Array.from(input.files);
    addFiles(files);
  };

  const showFiles = (files: string[]) => {
    let concat = files.join(', ');
    if (concat.length > 40) concat = `${concat.slice(0, 37)}...`;
    return concat;
  };
</script>

<Dropzone
  id="dropzone"
  on:drop={dropHandle}
  on:dragover={(event) => {
    event.preventDefault();
  }}
  on:change={handleChange}
  defaultClass="flex flex-col justify-center items-center w-full max-w-64 h-64 max-h-36 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
>
  <svg
    aria-hidden="true"
    class="mb-3 w-10 h-10 text-gray-400"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </svg>
  {#if file.length === 0}
    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
      <span class="font-semibold">Click to select</span> or drag and drop
    </p>
    <p class="text-xs text-gray-500 dark:text-gray-400">StorableSidebar.json</p>
  {:else}
    <p>{showFiles(file)}</p>
  {/if}
</Dropzone>
