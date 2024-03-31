/**
 * Thanks to [yuriten/arc-bookmarks-json-to-html](https://github.com/yuriten/arc-bookmarks-json-to-html)
 */

type TabData = {
  savedTitle: string;
  savedURL: string;
  timeLastActiveAt: number;
};

type Item = {
  value: {
    data: {
      tab: TabData;
    };
  };
};

const formatItems = (items: Item[]) => {
  // Filter out non-string items and items without tab data, then map them to bookmark HTML strings
  const bookmarks = items
    .filter((item) => typeof item !== 'string' && item.value?.data?.tab) // Select items that have tab data
    .map(
      ({
        value: {
          data: {
            tab: { savedTitle, savedURL, timeLastActiveAt }
          }
        }
      }) =>
        // For each selected item, create a bookmark HTML string
        `<DT><A HREF="${savedURL}" ADD_DATE="${Math.floor(timeLastActiveAt)}">${savedTitle}</A></DT>`
    );

  // Construct the final HTML with bookmarks
  const html: string = `<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">\n<TITLE>Bookmarks</TITLE>\n<H1>Bookmarks</H1>\n<DL><p>\n${bookmarks.join('\n')}\n</DL><p>`;
  return html;
};

const convertBookmarks = async (files: File[]) => {
  const selectedFile = files[0];

  try {
    const text = await fileToText(selectedFile);
    const json = JSON.parse(text) as { sidebarSyncState: { items: Item[] } }; // Assuming a structure for json
    // let items = json.sidebar.containers[1].items; // maybe it's work, not sure
    const items = json.sidebarSyncState.items;
    const convertedResult = formatItems(items);
    return convertedResult;
  } catch (error) {
    console.error('Error reading file:', error);
    return (error as Error).toString();
  }
};

const fileToText = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
  });
};

export default convertBookmarks;
