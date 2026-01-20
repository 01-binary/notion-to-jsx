/**
 * 타입 정의
 */

import type {
  BlockObjectResponse,
  PartialBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import type { OpenGraphData } from 'notion-types';

/** 기본 블록 타입 (Notion SDK) */
export type NotionBlock = BlockObjectResponse | PartialBlockObjectResponse;

/** 이미지 포맷 메타데이터 */
export interface ImageFormatMetadata {
  block_width?: number;
  block_height?: number;
  block_aspect_ratio?: number;
}

/** 이미지 블록 콘텐츠 구조 */
export interface ImageBlockContent {
  file?: { url: string; expiry_time?: string };
  external?: { url: string };
  format?: ImageFormatMetadata;
}

/** 북마크 블록 콘텐츠 구조 */
export interface BookmarkBlockContent {
  url: string;
  metadata?: OpenGraphData;
}

/** 하위 블록을 포함한 블록 (재귀 구조) */
export interface NotionBlockWithChildren {
  id: string;
  type?: string;
  image?: ImageBlockContent;
  bookmark?: BookmarkBlockContent;
  children?: NotionBlockWithChildren[];
  [key: string]: unknown;
}

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

// Re-export OpenGraphData for convenience
export type { OpenGraphData } from 'notion-types';
