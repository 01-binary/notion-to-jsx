import { Client as NotionClient } from '@notionhq/client';
import type { ClientOptions } from '@notionhq/client/build/src/Client';
import { getPageProperties as getPagePropertiesFunc } from './getPageProperties';
import { getFileUrl as getFileUrlFunc } from './getFileUrl';
import { getPageBlocks as getPageBlocksFunc } from './getPageBlocks';

export class Client extends NotionClient {
  constructor(options: ClientOptions = {}) {
    super(options);
  }

  getPageProperties = (
    pageId: string,
    keys: string[] = [],
    extractValues = true
  ) => getPagePropertiesFunc(this, pageId, keys, extractValues);

  getPageBlocks = (pageId: string) => getPageBlocksFunc(this, pageId);

  getFileUrl = (pageId: string, propertyKey: string) =>
    getFileUrlFunc(this, pageId, propertyKey);
}

export default Client;
