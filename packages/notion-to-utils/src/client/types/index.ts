/**
 * 타입, 상수, 타입 가드, 유틸리티 함수 통합 export
 *
 * 이 모듈은 하위 호환성을 위해 모든 것을 re-export합니다.
 * 새 코드에서는 개별 모듈에서 직접 import하는 것을 권장합니다.
 *
 * @example
 * // 권장: 개별 모듈에서 import
 * import { NotionBlock } from './types/definitions';
 * import { isImageBlock } from './types/guards';
 * import { FAVICON_SIZE_PX } from './types/constants';
 *
 * // 하위 호환: 통합 export에서 import
 * import { NotionBlock, isImageBlock, FAVICON_SIZE_PX } from './types';
 */

// 상수
export {
  FAVICON_SIZE_PX,
  NOTION_ID_LENGTH,
  GOOGLE_FAVICON_API,
  OG_SCRAPER_HEADERS,
} from './constants';

// 타입 정의
export type {
  NotionBlock,
  ImageFormatMetadata,
  ImageBlockContent,
  OpenGraphData,
  BookmarkBlockContent,
  NotionBlockWithChildren,
  OGScraperResult,
} from './definitions';

// 타입 가드
export { isImageBlock, isBookmarkBlock, hasChildren } from './guards';

// 유틸리티 함수
export {
  extractImageUrl,
  extractDomain,
  createBookmarkMetadata,
} from './utils';

// 이미지 URL 유틸리티
export {
  extractImageUrlWithSource,
  updateImageUrl,
  type ImageSourceType,
} from './imageUtils';
