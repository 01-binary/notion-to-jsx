/**
 * 타입 가드 함수
 */

import type { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import type {
  NotionBlock,
  ImageBlockContent,
  BookmarkBlockContent,
} from './definitions';

/**
 * 이미지 블록인지 확인하는 타입 가드
 */
export function isImageBlock(
  block: NotionBlock
): block is BlockObjectResponse & { type: 'image'; image: ImageBlockContent } {
  return 'type' in block && block.type === 'image';
}

/**
 * 북마크 블록인지 확인하는 타입 가드
 */
export function isBookmarkBlock(
  block: NotionBlock
): block is BlockObjectResponse & {
  type: 'bookmark';
  bookmark: BookmarkBlockContent;
} {
  return 'type' in block && block.type === 'bookmark';
}

/**
 * 하위 블록이 있는지 확인하는 타입 가드
 */
export function hasChildren(block: NotionBlock): block is BlockObjectResponse {
  return (
    'has_children' in block &&
    (block as BlockObjectResponse).has_children === true
  );
}
