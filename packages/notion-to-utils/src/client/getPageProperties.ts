import { Client } from '@notionhq/client';
import { isPageObjectResponse } from './utils/isPageObjectResponse';
import { extractValuesFromProperties } from './utils/extractValuesFromProperties';
import { formatNotionImageUrl } from './formatNotionImageUrl';

/**
 * Retrieves properties of a Notion page.
 *
 * @param {Client} client - The Notion client instance.
 * @param {string} pageId - The ID of the Notion page.
 * @param {string[]} [keys=[]] - Optional array of property keys to filter. If empty, all properties are returned.
 * @param {boolean} [extractValues=true] - Whether to extract values from properties.
 */
export async function getPageProperties(
  client: Client,
  pageId: string,
  keys: string[] = [],
  extractValues = true
) {
  const page = await client.pages.retrieve({
    page_id: pageId,
  });
  if (!isPageObjectResponse(page)) return;
  const { properties, cover } = page;

  // cover 이미지 URL 포맷팅
  let coverUrl = '';
  if (cover) {
    if (cover.type === 'file') {
      const url = cover.file?.url;
      if (url) {
        coverUrl = formatNotionImageUrl(url, pageId);
      }
    } else if (cover.type === 'external') {
      coverUrl = cover.external?.url;
    }
  }

  // cover 이미지 URL 추가
  if (coverUrl) {
    properties.coverUrl = {
      type: 'url',
      url: coverUrl,
      id: `${pageId}-coverUrl`,
    };
  }

  if (keys.length === 0) {
    return extractValues ? extractValuesFromProperties(properties) : properties;
  }

  const filteredProperties: Record<string, any> = {};

  keys.forEach((key) => {
    if (key in properties) {
      filteredProperties[key] = properties[key];
    }
  });

  return extractValues
    ? extractValuesFromProperties(filteredProperties)
    : filteredProperties;
}
