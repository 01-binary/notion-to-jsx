import { Client } from '@notionhq/client';
import { isPageObjectResponse } from './utils/isPageObjectResponse';

/**
 * Retrieves properties of a Notion page.
 *
 * @param {Client} client - The Notion client instance.
 * @param {string} pageId - The ID of the Notion page.
 * @param {string[]} [keys=[]] - Optional array of property keys to filter. If empty, all properties are returned.
 * @returns {Promise<PageObjectResponse['properties'] | undefined>} The requested page properties or undefined if the page is not found or is not a PageObjectResponse.
 */
export async function getPageProperties(
  client: Client,
  pageId: string,
  keys: string[] = []
) {
  const page = await client.pages.retrieve({
    page_id: pageId,
  });

  if (!isPageObjectResponse(page)) return;
  const { properties } = page;

  if (keys.length === 0) {
    return properties;
  }

  const filteredProperties: Record<string, any> = {};

  keys.forEach((key) => {
    if (key in properties) {
      filteredProperties[key] = properties[key];
    }
  });

  return filteredProperties;
}
