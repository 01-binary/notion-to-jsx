import { Client } from '@notionhq/client';
import type {
  PageObjectResponse,
  GetPageResponse,
} from '@notionhq/client/build/src/api-endpoints';

import {
  extractValuesFromProperties,
  type ExtractedValue,
} from './utils/extractValuesFromProperties';
import { formatNotionImageUrl } from '../utils/formatNotionImageUrl';

/**
 * getPageProperties 반환 타입
 */
export type GetPagePropertiesResult =
  | Record<string, ExtractedValue>
  | PageObjectResponse['properties']
  | undefined;

/**
 * 커버 이미지에서 URL을 추출합니다.
 *
 * @param cover - 페이지 커버 객체
 * @param pageId - 페이지 ID (URL 포맷팅에 사용)
 * @returns 포맷된 커버 이미지 URL 또는 빈 문자열
 */
function extractCoverUrl(
  cover: PageObjectResponse['cover'],
  pageId: string,
): string {
  if (!cover) return '';

  if (cover.type === 'file' && cover.file?.url) {
    return formatNotionImageUrl(cover.file.url, pageId);
  }

  if (cover.type === 'external' && cover.external?.url) {
    return cover.external.url;
  }

  return '';
}

/**
 * 속성 객체를 필터링하여 지정된 키만 반환합니다.
 *
 * @param properties - 전체 속성 객체
 * @param keys - 필터링할 키 배열
 * @returns 필터링된 속성 객체
 */
function filterProperties(
  properties: PageObjectResponse['properties'],
  keys: string[],
): PageObjectResponse['properties'] {
  const result: PageObjectResponse['properties'] = {};
  for (const key of keys) {
    const prop = properties[key];
    if (prop) {
      result[key] = prop;
    }
  }
  return result;
}

/**
 * getPageProperties 옵션
 */
export interface GetPagePropertiesOptions {
  /** 가져올 속성 키 배열 (빈 배열이면 모든 속성) */
  keys?: string[];
  /** 값을 추출할지 여부 (기본값: true) */
  extractValues?: boolean;
}

/**
 * Notion 페이지의 속성을 조회합니다.
 *
 * @param client - Notion 클라이언트 인스턴스
 * @param pageId - 페이지 ID
 * @param options - 옵션 객체
 * @returns 속성 객체 또는 추출된 값 객체
 *
 * @example
 * // 모든 속성의 값 추출
 * const props = await getPageProperties(client, 'page-id');
 *
 * // 특정 속성만 가져오기
 * const props = await getPageProperties(client, 'page-id', { keys: ['Title', 'Category'] });
 *
 * // 원본 속성 객체 가져오기
 * const props = await getPageProperties(client, 'page-id', { extractValues: false });
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

    const { properties, cover } = page;

    // 새 객체로 복사하여 원본 불변성 유지
    const enhancedProperties = { ...properties };

    // 커버 이미지 URL 추가
    const coverUrl = extractCoverUrl(cover, pageId);
    if (coverUrl) {
      enhancedProperties.coverUrl = {
        type: 'url',
        url: coverUrl,
        id: `${pageId}-coverUrl`,
      };
    }

    // 필터링 또는 전체 반환
    const targetProperties =
      keys.length > 0
        ? filterProperties(enhancedProperties, keys)
        : enhancedProperties;

    return extractValues
      ? extractValuesFromProperties(targetProperties)
      : targetProperties;
  } catch (error) {
    // 에러 발생 시 undefined 반환 (getPageBlocks의 빈 배열과 일관된 패턴)
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        `[notion-to-utils] 페이지 속성 가져오기 실패: ${pageId}`,
        error,
      );
    }
    return undefined;
  }
}

/**
 * 응답이 PageObjectResponse인지 확인하는 타입 가드
 */
export const isPageObjectResponse = (
  obj: GetPageResponse,
): obj is PageObjectResponse => {
  return obj && 'properties' in obj;
};
