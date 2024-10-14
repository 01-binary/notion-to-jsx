import {
  PageObjectResponse,
  GetPageResponse,
} from '@notionhq/client/build/src/api-endpoints';

export const isPageObjectResponse = (
  obj: GetPageResponse
): obj is PageObjectResponse => {
  return obj && 'properties' in obj;
};
