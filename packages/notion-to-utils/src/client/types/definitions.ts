/**
 * 타입 정의
 */

import type {
  BlockObjectResponse,
  PartialBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

// notion-types에서 공유 타입 re-export
export type {
  OpenGraphData,
  ImageFormatMetadata,
  NotionBlock,
  ImageBlock,
  BookmarkBlock,
} from 'notion-types';

/** Notion SDK 블록 타입 (API 응답용) */
export type NotionAPIBlock = BlockObjectResponse | PartialBlockObjectResponse;

/** 이미지 블록 콘텐츠 구조 (내부 처리용) */
export interface ImageBlockContent {
  type?: 'file' | 'external';
  file?: { url: string; expiry_time?: string };
  external?: { url: string };
  format?: {
    block_width?: number;
    block_height?: number;
    block_aspect_ratio?: number;
  };
}

/** 북마크 블록 콘텐츠 구조 (내부 처리용) */
export interface BookmarkBlockContent {
  url: string;
  caption?: unknown[];
  metadata?: {
    title: string;
    description: string;
    image: string;
    siteName: string;
    url: string;
    favicon?: string;
  };
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
