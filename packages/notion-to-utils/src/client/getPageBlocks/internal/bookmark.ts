/**
 * 북마크 블록 처리 유틸리티
 */

import ogs from 'open-graph-scraper';
import type { OpenGraphData, NotionBlock, BookmarkBlock } from '../../types';
import { FAVICON_SIZE_PX, GOOGLE_FAVICON_API, OG_SCRAPER_HEADERS } from '../constants';
import { ogMetadataCache, domainCache } from './cache';

/** OG 스크래퍼 결과 타입 */
export interface OGScraperResult {
  ogTitle?: string;
  twitterTitle?: string;
  ogDescription?: string;
  twitterDescription?: string;
  ogImage?: Array<{ url: string }>;
  twitterImage?: Array<{ url: string }>;
  ogSiteName?: string;
}

/**
 * URL에서 도메인을 안전하게 추출합니다.
 * URL 파싱 실패 시 null을 반환합니다.
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

/** OG 결과에서 title 추출 */
const getOGTitle = (og?: OGScraperResult): string | undefined =>
  og?.ogTitle || og?.twitterTitle;

/** OG 결과에서 description 추출 */
const getOGDescription = (og?: OGScraperResult): string =>
  og?.ogDescription || og?.twitterDescription || '';

/** OG 결과에서 image 추출 */
const getOGImage = (og?: OGScraperResult): string =>
  og?.ogImage?.[0]?.url || og?.twitterImage?.[0]?.url || '';

/** 북마크 메타데이터 생성 */
export function createBookmarkMetadata(
  bookmarkUrl: string,
  ogResult?: OGScraperResult,
): OpenGraphData {
  const domain = extractDomain(bookmarkUrl);
  const ogTitle = getOGTitle(ogResult);

  return {
    title: ogTitle || domain || bookmarkUrl,
    description: ogTitle ? getOGDescription(ogResult) : '',
    image: ogTitle ? getOGImage(ogResult) : '',
    siteName: ogResult?.ogSiteName || domain || '',
    url: bookmarkUrl,
    favicon: domain ? createFaviconUrl(domain) : '',
  };
}

/**
 * 북마크 URL에서 Open Graph 메타데이터를 가져옵니다.
 * LRU 캐시를 사용하여 동일 URL에 대한 중복 요청을 방지합니다.
 * 실패 시 기본 메타데이터를 반환합니다.
 */
async function fetchOGMetadata(url: string): Promise<OpenGraphData> {
  const cached = ogMetadataCache.get(url);
  if (cached) {
    return cached;
  }

  try {
    const { result } = await ogs({
      url,
      fetchOptions: {
        headers: OG_SCRAPER_HEADERS,
      },
    });
    const metadata = createBookmarkMetadata(url, result);
    ogMetadataCache.set(url, metadata);
    return metadata;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        `[notion-to-utils] OG 메타데이터 가져오기 실패: ${url}`,
        error,
      );
    }
    const fallback = createBookmarkMetadata(url);
    ogMetadataCache.set(url, fallback);
    return fallback;
  }
}

/**
 * 북마크 블록에 메타데이터를 보강합니다: OG 메타데이터 추가.
 * 새로운 블록 객체를 반환합니다 (불변성).
 */
export async function enrichBookmarkBlock(
  block: BookmarkBlock,
): Promise<NotionBlock> {
  const bookmarkUrl = block.bookmark.url;
  const metadata = await fetchOGMetadata(bookmarkUrl);

  return {
    ...block,
    bookmark: {
      ...block.bookmark,
      metadata,
    },
  } as NotionBlock;
}
