export * from './client';
export * from './utils';

import type {
  PageObjectResponse,
  MultiSelectPropertyItemObjectResponse,
  GetPageResponse,
  QueryDataSourceResponse,
} from '@notionhq/client/build/src/api-endpoints';
export type {
  PageObjectResponse,
  MultiSelectPropertyItemObjectResponse,
  GetPageResponse,
  /** @deprecated Use QueryDataSourceResponse instead (renamed in @notionhq/client v5) */
  QueryDataSourceResponse as QueryDatabaseResponse,
  QueryDataSourceResponse,
};
