import { Client } from '@notionhq/client';
import type { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints';

import type { NotionBlock, NotionAPIBlock } from '../types';
import { isImageBlock, isBookmarkBlock, hasChildren } from './internal/guards';
import { enrichImageBlock } from './internal/image';
import { enrichBookmarkBlock } from './internal/bookmark';

export type { NotionBlock };

/**
 * 페이지네이션을 처리하며 모든 블록을 가져옵니다.
 * 블록 처리 없이 원본 블록만 반환합니다.
 */
async function fetchAllPaginatedBlocks(
  client: Client,
  blockId: string,
): Promise<NotionAPIBlock[]> {
  const allBlocks: NotionAPIBlock[] = [];
  let cursor: string | undefined = undefined;

  do {
    const blocksResponse = (await client.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
    })) as ListBlockChildrenResponse;

    allBlocks.push(...blocksResponse.results);
    cursor = blocksResponse.has_more
      ? (blocksResponse.next_cursor ?? undefined)
      : undefined;
  } while (cursor);

  return allBlocks;
}

/**
 * 블록 타입에 따라 메타데이터를 보강합니다.
 * 이미지, 북마크 등 블록 타입별 메타데이터를 추가합니다.
 */
async function enrichBlock(block: NotionAPIBlock): Promise<NotionBlock> {
  if (isImageBlock(block)) {
    return enrichImageBlock(block);
  }

  if (isBookmarkBlock(block)) {
    return enrichBookmarkBlock(block);
  }

  return { ...block } as NotionBlock;
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
  blockId: string,
): Promise<NotionBlock[]> {
  try {
    const allBlocks = await fetchAllPaginatedBlocks(client, blockId);

    const enrichedBlocksWithChildren = await Promise.all(
      allBlocks.map(async (block) => {
        // 하위 블록 가져오기를 먼저 시작 (블록 처리와 병렬)
        const childrenPromise = hasChildren(block)
          ? fetchBlockChildren(client, block.id)
          : Promise.resolve(undefined);

        // 블록 타입에 따라 메타데이터 보강
        const enrichedBlock = await enrichBlock(block);

        // 하위 블록 처리 완료 대기
        const children = await childrenPromise;
        if (children) {
          enrichedBlock.children = children;
        }

        return enrichedBlock;
      }),
    );

    return enrichedBlocksWithChildren;
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
  pageId: string,
): Promise<NotionBlock[]> {
  try {
    return await fetchBlockChildren(client, pageId);
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(
        `[notion-to-utils] 페이지 블록 가져오기 실패: ${pageId}`,
        error,
      );
    }
    return [];
  }
}
