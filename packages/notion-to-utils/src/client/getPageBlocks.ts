import { Client } from '@notionhq/client';
import {
  ListBlockChildrenResponse,
  BlockObjectResponse,
  PartialBlockObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';

// 블록 타입 정의
export type NotionBlock = BlockObjectResponse | PartialBlockObjectResponse;

// 하위 블록을 가진 블록 타입 (인덱스 시그니처 사용)
export interface NotionBlockWithChildren extends Record<string, any> {
  id: string;
  children?: NotionBlockWithChildren[];
}

// has_children 속성이 있는지 확인하는 타입 가드 함수
function hasChildren(block: NotionBlock): block is BlockObjectResponse {
  return (
    'has_children' in block &&
    (block as BlockObjectResponse).has_children === true
  );
}

/**
 * 특정 블록의 모든 하위 블록을 재귀적으로 가져오는 함수
 */
async function fetchBlockChildren(
  client: Client,
  blockId: string
): Promise<NotionBlockWithChildren[]> {
  try {
    // 페이지네이션을 처리하며 모든 하위 블록 가져오기
    let allBlocks: NotionBlock[] = [];
    let hasMore = true;
    let nextCursor = undefined;

    while (hasMore) {
      const response = (await client.blocks.children.list({
        block_id: blockId,
        start_cursor: nextCursor,
      })) as ListBlockChildrenResponse;

      allBlocks = [...allBlocks, ...response.results];
      hasMore = response.has_more;
      nextCursor = response.next_cursor || undefined;
    }

    // 하위 블록이 있는 블록들에 대해 재귀적으로 처리
    const blocksWithChildren = await Promise.all(
      allBlocks.map(async (block) => {
        // 타입 단언을 사용하여 안전하게 변환
        const blockWithChildren = {
          ...block,
        } as unknown as NotionBlockWithChildren;

        // 타입 가드를 사용하여 has_children 속성 확인
        if (hasChildren(block)) {
          // 하위 블록 가져오기
          const children = await fetchBlockChildren(client, block.id);
          // 원본 블록에 children 속성 추가
          blockWithChildren.children = children;
        }

        return blockWithChildren;
      })
    );

    return blocksWithChildren;
  } catch (error) {
    console.error(`Error fetching children for block ${blockId}:`, error);
    return [];
  }
}

/**
 * 페이지의 모든 블록을 재귀적으로 가져오는 함수
 */
export async function getPageBlocks(
  client: Client,
  pageId: string
): Promise<NotionBlockWithChildren[]> {
  try {
    const blocks = await fetchBlockChildren(client, pageId);
    return blocks;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}
