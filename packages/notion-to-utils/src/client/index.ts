import { Client as NotionClient } from '@notionhq/client';

import type { ClientOptions } from '@notionhq/client/build/src/Client';
import { isPageObjectResponse } from '../page/isPageObjectResponse';
import { isPropertyFileType } from '../file/isPropertyFileType';

export class Client extends NotionClient {
  constructor(options: ClientOptions = {}) {
    super(options);
  }

  async getPageProperties(pageId: string, keys: string[] = []) {
    const res = await this.pages.retrieve({
      page_id: pageId,
    });

    if (isPageObjectResponse(res)) {
      const properties = res.properties;

      // keys가 빈 배열이면 모든 properties를 반환
      if (keys.length === 0) {
        return properties;
      }

      const filteredProperties: Record<string, any> = {};

      // keys 배열을 순회하면서 해당하는 properties 값을 추출
      keys.forEach((key) => {
        if (key in properties) {
          filteredProperties[key] = properties[key];
        }
      });

      return filteredProperties; // 추출된 properties 반환
    }

    return;
  }

  async getFileUrl(pageId: string, propertyKey: string) {
    const res = await this.pages.retrieve({
      page_id: pageId,
    });

    if (isPropertyFileType(res, propertyKey)) {
      const property = res.properties[propertyKey]!;
      const fileObj = property.files[0];
      if ('file' in fileObj) {
        const fileUrl = fileObj.file.url;
        return fileUrl;
      }
    }
    return;
  }
}

export default Client;
