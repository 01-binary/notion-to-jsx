import {
  PageObjectResponse,
  GetPageResponse,
} from '@notionhq/client/build/src/api-endpoints';

/**
 * Type guard function to check if the response is a PageObjectResponse
 * @param {GetPageResponse} obj - The response object from Notion API
 * @returns {boolean} True if the object is a PageObjectResponse
 */
export const isPageObjectResponse = (
  obj: GetPageResponse
): obj is PageObjectResponse => {
  return obj && 'properties' in obj;
};
