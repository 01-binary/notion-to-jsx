import { Client } from '@notionhq/client';
import type {
  PageObjectResponse,
  GetPageResponse,
} from '@notionhq/client/build/src/api-endpoints';

import {
  extractCoverUrl,
  extractValuesFromProperties,
  type ExtractedValue,
} from '../../utils';

/** getPageProperties 반환 타입 */
export type GetPagePropertiesResult =
  | Record<string, ExtractedValue>
  | PageObjectResponse['properties']
  | undefined;

/** getPageProperties 옵션 */
export interface GetPagePropertiesOptions {
  /** 가져올 속성 키 배열 (빈 배열이면 모든 속성) */
  keys?: string[];
  /** 값을 추출할지 여부 (기본값: true) */
  extractValues?: boolean;
}

/** 커버 URL을 포함한 속성 객체 생성 */
function enrichPropertiesWithCover(
  properties: PageObjectResponse['properties'],
  cover: PageObjectResponse['cover'],
  pageId: string,
): PageObjectResponse['properties'] {
  const coverUrl = extractCoverUrl(cover, pageId);
  if (!coverUrl) return { ...properties };

  return {
    ...properties,
    coverUrl: { type: 'url', url: coverUrl, id: `${pageId}-coverUrl` },
  };
}

/** 지정된 키만 필터링 */
function filterProperties(
  properties: PageObjectResponse['properties'],
  keys: string[],
): PageObjectResponse['properties'] {
  const result: PageObjectResponse['properties'] = {};
  for (const key of keys) {
    if (properties[key]) result[key] = properties[key];
  }
  return result;
}

/** 응답이 PageObjectResponse인지 확인하는 타입 가드 */
export const isPageObjectResponse = (
  obj: GetPageResponse,
): obj is PageObjectResponse => obj && 'properties' in obj;

/**
 * Notion 페이지의 속성을 조회합니다.
 */
export async function getPageProperties(
  client: Client,
  pageId: string,
  options: GetPagePropertiesOptions = {},
): Promise<GetPagePropertiesResult> {
  const { keys = [], extractValues = true } = options;

  try {
    const page = await client.pages.retrieve({ page_id: pageId });
    if (!isPageObjectResponse(page)) return undefined;

    const enrichedProperties = enrichPropertiesWithCover(
      page.properties,
      page.cover,
      pageId,
    );

    const targetProperties =
      keys.length > 0
        ? filterProperties(enrichedProperties, keys)
        : enrichedProperties;

    return extractValues
      ? extractValuesFromProperties(targetProperties)
      : targetProperties;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        `[notion-to-utils] 페이지 속성 가져오기 실패: ${pageId}`,
        error,
      );
    }
    return undefined;
  }
}
