import {
  GetPageResponse,
  PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

type NonEmptyArray<T> = [T, ...T[]];

/**
 * Type guard function to check if a property of a Notion page is a files property and contains at least one file
 * @param {GetPageResponse} obj - The response object from Notion API
 * @param {keyof PageObjectResponse['properties']} propertyKey - The key of the property to check
 * @returns {boolean} True if the property exists, is of type 'files', and contains at least one file
 */
export const isPropertyFileType = (
  obj: GetPageResponse,
  propertyKey: keyof PageObjectResponse['properties']
): obj is PageObjectResponse & {
  properties: {
    [K in typeof propertyKey]: {
      type: 'files';
      files: NonEmptyArray<
        | {
            file: {
              url: string;
              expiry_time: string;
            };
            name: string;
            type?: 'file';
          }
        | {
            external: {
              url: string;
            };
            name: string;
            type?: 'external';
          }
      >;
      id: string;
    };
  };
} => {
  return (
    obj &&
    'properties' in obj &&
    obj.properties[propertyKey] !== undefined && // key가 존재하는지 체크
    obj.properties[propertyKey].type === 'files' &&
    Array.isArray(obj.properties[propertyKey].files) &&
    obj.properties[propertyKey].files.length > 0
  );
};
