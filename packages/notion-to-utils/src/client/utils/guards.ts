/**
 * 타입 가드 함수
 */

import type {
  NotionBlock,
  ImageBlock,
  BookmarkBlock,
  NotionAPIBlock,
} from '../types/definitions';

/**
 * 이미지 블록인지 확인하는 타입 가드
 */
export function isImageBlock(
  block: NotionBlock | NotionAPIBlock,
): block is ImageBlock {
  return 'type' in block && block.type === 'image';
}

/**
 * 북마크 블록인지 확인하는 타입 가드
 */
export function isBookmarkBlock(
  block: NotionBlock | NotionAPIBlock,
): block is BookmarkBlock {
  return 'type' in block && block.type === 'bookmark';
}

/**
 * 하위 블록이 있는지 확인하는 타입 가드
 */
export function hasChildren(block: NotionBlock | NotionAPIBlock): boolean {
  return 'has_children' in block && block.has_children === true;
}
