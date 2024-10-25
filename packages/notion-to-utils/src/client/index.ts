import { Client as NotionClient } from '@notionhq/client';
import type { ClientOptions } from '@notionhq/client/build/src/Client';
import { getPageProperties as getPagePropertiesFunc } from './getPageProperties';
import { getFileUrl as getFileUrlFunc } from './getFileUrl';

export class Client extends NotionClient {
  constructor(options: ClientOptions = {}) {
    super(options);
  }

  getPageProperties = (pageId: string, keys?: string[]) =>
    getPagePropertiesFunc(this, pageId, keys);
  getFileUrl = (pageId: string, propertyKey: string) =>
    getFileUrlFunc(this, pageId, propertyKey);
}

export default Client;
