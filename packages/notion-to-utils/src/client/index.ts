import { Client as NotionClient } from '@notionhq/client';
import type { ClientOptions } from '@notionhq/client/build/src/Client';
import { getPageProperties as getPagePropertiesFunc } from './getPageProperties';
import { getFileUrl as getFileUrlFunc } from './getFileUrl';
import { getPageBlocks as getPageBlocksFunc } from './getPageBlocks';
import { formatNotionImageUrl as formatNotionImageUrlFunc } from './formatNotionImageUrl';

export class Client extends NotionClient {
  constructor(options: ClientOptions = {}) {
    super(options);
  }

  getPageProperties = (pageId: string, keys?: string[]) =>
    getPagePropertiesFunc(this, pageId, keys);
  getFileUrl = (pageId: string, propertyKey: string) =>
    getFileUrlFunc(this, pageId, propertyKey);
  getPageBlocks = (pageId: string) => getPageBlocksFunc(this, pageId);
  formatNotionImageUrl = (url: string, blockId?: string) =>
    formatNotionImageUrlFunc(url, blockId);
}

export default Client;
