/**
 * 북마크 관련 유틸리티 함수
 */

import type {
  ImageBlockContent,
  OpenGraphData,
  OGScraperResult,
} from '../types/definitions';
import { FAVICON_SIZE_PX, GOOGLE_FAVICON_API } from '../constants';
import { extractImageUrlWithSource } from './imageUtils';

/**
 * 이미지 블록에서 URL을 추출합니다.
 * file과 external 이미지 소스 모두 처리합니다.
 */
export function extractImageUrl(image: ImageBlockContent): string | null {
  return extractImageUrlWithSource(image).url;
}

/** 도메인 추출 결과 캐시 (URL 파싱 비용 절감) */
const domainCache = new Map<string, string | null>();

/**
 * URL에서 도메인을 안전하게 추출합니다.
 * URL 파싱 실패 시 null을 반환합니다.
 * 캐시를 사용하여 동일 URL의 반복 파싱을 방지합니다.
 */
export function extractDomain(url: string): string | null {
  const cached = domainCache.get(url);
  if (cached !== undefined) {
    return cached;
  }

  try {
    const hostname = new URL(url).hostname;
    domainCache.set(url, hostname);
    return hostname;
  } catch {
    domainCache.set(url, null);
    return null;
  }
}

/**
 * Google Favicon API URL 생성
 */
function createFaviconUrl(domain: string | null): string {
  return domain
    ? `${GOOGLE_FAVICON_API}?domain=${domain}&sz=${FAVICON_SIZE_PX}`
    : '';
}

/**
 * 북마크 메타데이터를 생성합니다.
 * OG 스크래퍼 결과가 있으면 사용하고, 없으면 폴백 메타데이터를 생성합니다.
 *
 * @param bookmarkUrl - 북마크 URL
 * @param ogResult - OG 스크래퍼 결과 (선택)
 * @returns 북마크 메타데이터
 */
export function createBookmarkMetadata(
  bookmarkUrl: string,
  ogResult?: OGScraperResult
): OpenGraphData {
  const domain = extractDomain(bookmarkUrl);
  const favicon = createFaviconUrl(domain);

  // OG 스크래퍼 성공 시
  if (ogResult?.ogTitle || ogResult?.twitterTitle) {
    return {
      title: ogResult.ogTitle || ogResult.twitterTitle || domain || bookmarkUrl,
      description: ogResult.ogDescription || ogResult.twitterDescription || '',
      image: ogResult.ogImage?.[0]?.url || ogResult.twitterImage?.[0]?.url || '',
      siteName: ogResult.ogSiteName || domain || '',
      url: bookmarkUrl,
      favicon,
    };
  }

  // 도메인만 추출 가능한 경우
  if (domain) {
    return {
      title: domain,
      description: '',
      image: '',
      siteName: domain,
      url: bookmarkUrl,
      favicon,
    };
  }

  // URL 파싱도 실패한 경우 폴백
  return {
    title: bookmarkUrl,
    description: '',
    image: '',
    siteName: '',
    url: bookmarkUrl,
    favicon: '',
  };
}
