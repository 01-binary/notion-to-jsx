/**
 * 상수 정의
 */

/** Favicon 이미지 크기 (픽셀) */
export const FAVICON_SIZE_PX = 64;

/** Notion ID 길이 (하이픈 제외) */
export const NOTION_ID_LENGTH = 32;

/** Google Favicon API URL */
export const GOOGLE_FAVICON_API = 'https://www.google.com/s2/favicons';

/** Notion 이미지 프록시 기본 URL */
export const NOTION_IMAGE_BASE_URL = 'https://www.notion.so/image/';

/** OG 스크래퍼용 HTTP 헤더 */
export const OG_SCRAPER_HEADERS = {
  'user-agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
  accept:
    'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'cache-control': 'max-age=0',
} as const;
