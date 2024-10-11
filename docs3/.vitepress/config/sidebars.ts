import sidebarsjson from './sidebarscg.json'

type Item = {
  text: string
  items?: Item[]
  link?: string
  linkFormat?: boolean
}

function formatLinks(data: Record<string, Item>): Item[] {
  const formattedData: Item[] = [];

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const item = data[key];
      const prefix = item.linkFormat === false ? '' : `/${key}`;
      if (item.items) {
        formattedData.push({
          text: item.text,
          items: item.items.map(subItem => ({
            text: subItem.text,
            link: prefix + subItem.link
          }))
        });
      } else {
        formattedData.push({
          text: item.text,
          link: prefix + item.link
        });
      }
    }
  }

  return formattedData;
}

export const sidebars = formatLinks(sidebarsjson);
