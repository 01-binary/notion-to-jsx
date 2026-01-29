import type { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

import { formatNotionImageUrl } from './formatNotionImageUrl';

/**
 * 커버 이미지에서 URL을 추출합니다.
 * 내부(S3) 및 외부 URL 모두 formatNotionImageUrl을 통해 Notion CDN 프록시 형식으로 변환합니다.
 *
 * @param cover - Notion 페이지의 cover 객체
 * @param pageId - 페이지 ID (Notion 이미지 URL 생성에 사용)
 * @returns 포맷팅된 이미지 URL 또는 빈 문자열
 */
export function extractCoverUrl(
  cover: PageObjectResponse['cover'],
  pageId: string,
): string {
  if (!cover) return '';
  const url = cover.type === 'file' ? cover.file?.url : cover.external?.url;
  return formatNotionImageUrl(url, pageId);
}
