/**
 * Thanks to [yuriten/arc-bookmarks-json-to-html](https://github.com/yuriten/arc-bookmarks-json-to-html)
 */

type TabData = {
  savedTitle: string;
  savedURL: string;
  timeLastActiveAt: number;
};

type Folder = {
  id: string;
  title: string;
  childrenIds: string[]
};

type Link = {
  id: string;
  title: string;
  data: {
    tab: TabData
  }
}

type Item = Folder | Link;

type SpaceModel = {
  id: string
  title: string
  containerIDs: string[]
}

type ArcBookmarksJson = {
  sidebar: {
    containers: [
      object,
      {
        spaces: [string | SpaceModel]
        items: [string | Item]
      }
    ]
  }
};

type ItemsMap = {
  [key: string]: Item;
};

// items can be an Item or string
const createItemsMap = (items: (Item | string)[]): ItemsMap => {
  return items.reduce<ItemsMap>((acc, item) => {
    if (typeof item !== 'string') {
      acc[item.id] = item;
    }
    return acc;
  }, {});
}

const getSpaces = (spaceModels: (SpaceModel | string)[], items: ItemsMap): Folder[] => {
  return spaceModels
    .filter((space): space is SpaceModel => typeof space !== 'string')
    // Ignore all container IDs other than pinned
    .map((space): Folder => {
      const containerId = space.containerIDs[3];
      const item = items[containerId];
      if (!item || !('childrenIds' in item)) {
        throw new Error(`Item with id ${containerId} is not a Folder, Arc changed their JSON format?`);
      }

      return {
        id: containerId,
        title: space.title,
        childrenIds: item.childrenIds
      };
    });
}

const isCategory = (item: Item): item is Folder => 'childrenIds' in item && !!item.childrenIds?.length;

const deepFormatItems = (list: Item[], items: ItemsMap): string => {
  return list
    .map(item => {
      if (isCategory(item)) {
        return `<DT><H3>${item.title}</H3>\n<DL><p>\n${deepFormatItems(item.childrenIds.map((id: string) => items[id]), items)}\n</DL><p>`;
      } else if ('data' in item && 'tab' in item.data) {
        return `<DT><A HREF="${item.data.tab.savedURL}" ADD_DATE="${Math.floor(item.data.tab.timeLastActiveAt)}">${item.data.tab.savedTitle}</A></DT>`;
      } else {
        return ""
      }
    })
    .join("\n");
}

const formatItems = (spaces: Folder[], items: ItemsMap) => {
  const bookmarks = deepFormatItems(spaces, items)

  // Construct the final HTML with bookmarks
  const html: string = `<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">\n<TITLE>Bookmarks</TITLE>\n<H1>Bookmarks</H1>\n<DL><p>\n${bookmarks}\n</DL><p>`;
  return html;
};

const convertBookmarks = async (files: File[]) => {
  const selectedFile = files[0];

  try {
    const text = await fileToText(selectedFile);
    const json = JSON.parse(text) as ArcBookmarksJson; // Assuming a structure for json

    const container = json.sidebar.containers[1];
    const items = createItemsMap(container.items);
    const spaces = getSpaces(container.spaces, items)

    return formatItems(spaces, items);
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
