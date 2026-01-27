import { Client as NotionClient } from '@notionhq/client';
import type { ClientOptions } from '@notionhq/client/build/src/Client';
import {
  getPageProperties as getPagePropertiesFunc,
  type GetPagePropertiesOptions,
} from './getPageProperties';
import { getFileUrl as getFileUrlFunc } from './getFileUrl';
import { getPageBlocks as getPageBlocksFunc } from './getPageBlocks';

// 사용자를 위한 타입 re-export
export type {
  NotionBlock,
  ImageBlockContent,
  ImageFormatMetadata,
  OpenGraphData,
  BookmarkBlockContent,
} from './types';

// 유틸리티 함수 re-export
export { isImageBlock, isBookmarkBlock, hasChildren } from './utils/guards';

export {
  extractImageUrl,
  extractDomain,
  createBookmarkMetadata,
} from './utils/bookmark';

export class Client extends NotionClient {
  constructor(options: ClientOptions = {}) {
    super(options);
  }

  getPageProperties = (pageId: string, options: GetPagePropertiesOptions = {}) =>
    getPagePropertiesFunc(this, pageId, options);

  getPageBlocks = (pageId: string) => getPageBlocksFunc(this, pageId);

  getFileUrl = (pageId: string, propertyKey: string) =>
    getFileUrlFunc(this, pageId, propertyKey);
}

export default Client;
