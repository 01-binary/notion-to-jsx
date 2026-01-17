import { Client } from '@notionhq/client';
import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { isPageObjectResponse } from './utils/isPageObjectResponse';
import { extractValuesFromProperties } from './utils/extractValuesFromProperties';
import { formatNotionImageUrl } from '../utils/formatNotionImageUrl';

/**
 * 커버 이미지에서 URL을 추출합니다.
 *
 * @param cover - 페이지 커버 객체
 * @param pageId - 페이지 ID (URL 포맷팅에 사용)
 * @returns 포맷된 커버 이미지 URL 또는 빈 문자열
 */
function extractCoverUrl(
  cover: PageObjectResponse['cover'],
  pageId: string
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
  keys: string[]
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
 * Notion 페이지의 속성을 조회합니다.
 *
 * @param client - Notion 클라이언트 인스턴스
 * @param pageId - 페이지 ID
 * @param keys - 가져올 속성 키 배열 (빈 배열이면 모든 속성)
 * @param extractValues - 값을 추출할지 여부 (기본값: true)
 * @returns 속성 객체 또는 추출된 값 객체
 *
 * @example
 * // 모든 속성의 값 추출
 * const props = await getPageProperties(client, 'page-id');
 *
 * // 특정 속성만 가져오기
 * const props = await getPageProperties(client, 'page-id', ['Title', 'Category']);
 *
 * // 원본 속성 객체 가져오기
 * const props = await getPageProperties(client, 'page-id', [], false);
 */
export async function getPageProperties(
  client: Client,
  pageId: string,
  keys: string[] = [],
  extractValues = true
) {
  const page = await client.pages.retrieve({ page_id: pageId });

  if (!isPageObjectResponse(page)) return;

  const { properties, cover } = page;

  // 커버 이미지 URL 추가
  const coverUrl = extractCoverUrl(cover, pageId);
  if (coverUrl) {
    properties.coverUrl = {
      type: 'url',
      url: coverUrl,
      id: `${pageId}-coverUrl`,
    };
  }

  // 필터링 또는 전체 반환
  const targetProperties =
    keys.length > 0 ? filterProperties(properties, keys) : properties;

  return extractValues
    ? extractValuesFromProperties(targetProperties)
    : targetProperties;
}
