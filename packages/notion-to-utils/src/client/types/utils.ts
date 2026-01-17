/**
 * 유틸리티 함수
 */

import type {
  ImageBlockContent,
  BookmarkMetadata,
  OGScraperResult,
} from './definitions';
import { FAVICON_SIZE_PX, GOOGLE_FAVICON_API } from './constants';

/**
 * 이미지 블록에서 URL을 추출합니다.
 * file과 external 이미지 소스 모두 처리합니다.
 */
export function extractImageUrl(image: ImageBlockContent): string | null {
  if (image.file?.url) {
    return image.file.url;
  }
  if (image.external?.url) {
    return image.external.url;
  }
  return null;
}

/**
 * URL에서 도메인을 안전하게 추출합니다.
 * URL 파싱 실패 시 null을 반환합니다.
 */
export function extractDomain(url: string): string | null {
  try {
    return new URL(url).hostname;
  } catch {
    return null;
  }
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
): BookmarkMetadata {
  const domain = extractDomain(bookmarkUrl);

  // OG 데이터 추출 헬퍼
  const getTitle = () =>
    ogResult?.ogTitle || ogResult?.twitterTitle || domain || bookmarkUrl;
  const getDescription = () =>
    ogResult?.ogDescription || ogResult?.twitterDescription || '';
  const getImage = () =>
    ogResult?.ogImage?.[0]?.url || ogResult?.twitterImage?.[0]?.url || '';
  const getSiteName = () => ogResult?.ogSiteName || domain || '';
  const getFavicon = () =>
    domain ? `${GOOGLE_FAVICON_API}?domain=${domain}&sz=${FAVICON_SIZE_PX}` : '';

  // OG 스크래퍼 성공 시
  if (ogResult?.ogTitle || ogResult?.twitterTitle) {
    return {
      title: getTitle(),
      description: getDescription(),
      image: getImage(),
      siteName: getSiteName(),
      url: bookmarkUrl,
      favicon: getFavicon(),
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
      favicon: getFavicon(),
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
