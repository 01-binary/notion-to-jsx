import { Client } from '@notionhq/client';
import { isPropertyFileType } from './utils/isPropertyFileType';
/**
 * Retrieves the URL of a file attached to a specific property of a Notion page.
 *
 * @async
 * @param {string} pageId - The ID of the Notion page.
 * @param {string} propertyKey - The key of the property containing the file.
 * @returns {Promise<string | undefined>} The URL of the file if found, otherwise undefined.
 * @throws {Error} If there's an issue retrieving the page or if the property is not of file type.
 */
export async function getFileUrl(
  client: Client,
  pageId: string,
  propertyKey: string
) {
  const page = await client.pages.retrieve({
    page_id: pageId,
  });

  if (!isPropertyFileType(page, propertyKey)) return undefined;

  const property = page.properties[propertyKey]!;
  const fileObj = property.files[0];
  return 'file' in fileObj ? fileObj.file.url : undefined;
}
