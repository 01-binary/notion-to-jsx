import { Client as NotionClient } from '@notionhq/client';
import type { ClientOptions } from '@notionhq/client/build/src/Client';
import {
  getPageProperties as getPagePropertiesFunc,
  type GetPagePropertiesOptions,
} from './getPageProperties';
import { getFileUrl as getFileUrlFunc } from './getFileUrl';
import { getPageBlocks as getPageBlocksFunc } from './getPageBlocks';

// 사용자를 위한 타입 re-export
export type { NotionBlock } from './types';

export class Client extends NotionClient {
  constructor(options: ClientOptions = {}) {
    super(options);
  }

  getPageProperties = (
    pageId: string,
    options: GetPagePropertiesOptions = {},
  ) => getPagePropertiesFunc(this, pageId, options);

  getPageBlocks = (pageId: string) => getPageBlocksFunc(this, pageId);

  getFileUrl = (pageId: string, propertyKey: string) =>
    getFileUrlFunc(this, pageId, propertyKey);
}

export default Client;
