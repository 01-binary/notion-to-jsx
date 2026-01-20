import { Client } from '@notionhq/client';
import ogs from 'open-graph-scraper';
import type { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints';

import { formatNotionImageUrl } from '../utils/formatNotionImageUrl';
import { enrichImageWithMetadata } from './utils/getImageMetadata';
import {
  type NotionBlock,
  type NotionBlockWithChildren,
  type ImageBlockContent,
  type OpenGraphData,
  isImageBlock,
  isBookmarkBlock,
  hasChildren,
  extractImageUrl,
  updateImageUrl,
  createBookmarkMetadata,
  OG_SCRAPER_HEADERS,
} from './types';

// 하위 호환성을 위한 타입 re-export
export type { NotionBlock, NotionBlockWithChildren };

/**
 * 페이지네이션을 처리하며 모든 블록을 가져옵니다.
 * 블록 처리 없이 원본 블록만 반환합니다.
 */
async function fetchAllPaginatedBlocks(
  client: Client,
  blockId: string
): Promise<NotionBlock[]> {
  const allBlocks: NotionBlock[] = [];
  let cursor: string | undefined = undefined;

  do {
    const response = (await client.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
    })) as ListBlockChildrenResponse;

    allBlocks.push(...response.results);
    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return allBlocks;
}

/**
 * 이미지 블록을 처리합니다: URL 포맷팅 및 메타데이터 추가.
 * 새로운 블록 객체를 반환합니다 (불변성).
 */
async function processImageBlock(
  block: NotionBlock & { type: 'image'; image: ImageBlockContent }
): Promise<NotionBlockWithChildren> {
  const image = block.image;
  const url = extractImageUrl(image);

  // 이미지 URL 포맷팅
  const processedImage = url
    ? updateImageUrl(image, formatNotionImageUrl(url, block.id))
    : image;

  // 메타데이터 추가 (크기 정보)
  const enrichedImage = await enrichImageWithMetadata(processedImage);

  return {
    ...block,
    image: enrichedImage,
  } as NotionBlockWithChildren;
}

/**
 * 북마크 URL에서 Open Graph 메타데이터를 가져옵니다.
 * 실패 시 기본 메타데이터를 반환합니다.
 */
async function fetchOGMetadata(url: string): Promise<OpenGraphData> {
  try {
    const { result } = await ogs({
      url,
      fetchOptions: {
        headers: OG_SCRAPER_HEADERS,
      },
    });
    return createBookmarkMetadata(url, result);
  } catch (error) {
    // OG 메타데이터 가져오기는 선택적 기능이므로 조용히 폴백
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[notion-to-utils] OG 메타데이터 가져오기 실패: ${url}`, error);
    }
    return createBookmarkMetadata(url);
  }
}

/**
 * 북마크 블록을 처리합니다: OG 메타데이터 가져오기.
 * 새로운 블록 객체를 반환합니다 (불변성).
 */
async function processBookmarkBlock(
  block: NotionBlock & { type: 'bookmark'; bookmark: { url: string } }
): Promise<NotionBlockWithChildren> {
  const bookmarkUrl = block.bookmark.url;
  const metadata = await fetchOGMetadata(bookmarkUrl);

  return {
    ...block,
    bookmark: {
      ...block.bookmark,
      metadata,
    },
  } as NotionBlockWithChildren;
}

/**
 * 블록 타입에 따라 처리합니다.
 * 이미지, 북마크 등 블록 타입별 처리를 수행합니다.
 */
async function processBlock(
  block: NotionBlock
): Promise<NotionBlockWithChildren> {
  if (isImageBlock(block)) {
    return processImageBlock(block);
  }

  if (isBookmarkBlock(block)) {
    return processBookmarkBlock(block);
  }

  return { ...block } as NotionBlockWithChildren;
}

/**
 * 모든 하위 블록을 재귀적으로 가져오고 처리합니다.
 *
 * 기능:
 * - 페이지네이션 자동 처리
 * - 이미지 블록 처리 (URL 포맷팅 + 메타데이터)
 * - 북마크 블록 처리 (OG 메타데이터)
 * - 중첩된 하위 블록 재귀적 가져오기
 * - 병렬 처리로 성능 최적화
 */
async function fetchBlockChildren(
  client: Client,
  blockId: string
): Promise<NotionBlockWithChildren[]> {
  try {
    const allBlocks = await fetchAllPaginatedBlocks(client, blockId);

    const blocksWithChildren = await Promise.all(
      allBlocks.map(async (block) => {
        // 하위 블록 가져오기를 먼저 시작 (블록 처리와 병렬)
        const childrenPromise = hasChildren(block)
          ? fetchBlockChildren(client, block.id)
          : Promise.resolve(undefined);

        // 블록 타입에 따라 처리
        const processedBlock = await processBlock(block);

        // 하위 블록 처리 완료 대기
        const children = await childrenPromise;
        if (children) {
          processedBlock.children = children;
        }

        return processedBlock;
      })
    );

    return blocksWithChildren;
  } catch (error) {
    // 블록 가져오기 실패 시 빈 배열 반환 (부분 실패 허용)
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[notion-to-utils] 블록 가져오기 실패: ${blockId}`, error);
    }
    return [];
  }
}

/**
 * 노션 페이지의 모든 블록을 재귀적으로 가져옵니다.
 *
 * @param client - 노션 클라이언트 인스턴스
 * @param pageId - 블록을 가져올 페이지 ID
 * @returns 하위 블록이 포함된 블록 배열
 *
 * @example
 * const client = new Client({ auth: process.env.NOTION_TOKEN });
 * const blocks = await getPageBlocks(client, 'page-id-here');
 */
export async function getPageBlocks(
  client: Client,
  pageId: string
): Promise<NotionBlockWithChildren[]> {
  try {
    return await fetchBlockChildren(client, pageId);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[notion-to-utils] 페이지 블록 가져오기 실패: ${pageId}`, error);
    }
    return [];
  }
}
