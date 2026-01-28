import { describe, it, expect } from 'vitest';
import { isImageBlock, isBookmarkBlock, hasChildren } from './guards';
import type { NotionAPIBlock, ImageBlockContent } from '../../types';

// ============================================
// Mock 팩토리 함수
// ============================================

/** 기본 블록 Mock 생성 */
function createMockBlock(
  overrides: Partial<NotionAPIBlock> = {}
): NotionAPIBlock {
  return {
    object: 'block',
    id: 'test-block-id',
    parent: { type: 'page_id', page_id: 'test-page-id' },
    created_time: '2024-01-01T00:00:00.000Z',
    last_edited_time: '2024-01-01T00:00:00.000Z',
    created_by: { object: 'user', id: 'test-user-id' },
    last_edited_by: { object: 'user', id: 'test-user-id' },
    has_children: false,
    archived: false,
    in_trash: false,
    type: 'paragraph',
    paragraph: { rich_text: [], color: 'default' },
    ...overrides,
  } as NotionAPIBlock;
}

/** 이미지 블록 Mock 생성 */
function createMockImageBlock(
  imageContent: Partial<ImageBlockContent> = {}
): NotionAPIBlock {
  return createMockBlock({
    type: 'image',
    image: {
      type: 'file',
      file: { url: 'https://s3.amazonaws.com/test.jpg', expiry_time: '' },
      ...imageContent,
    },
  } as Partial<NotionAPIBlock>);
}

/** 북마크 블록 Mock 생성 */
function createMockBookmarkBlock(url = 'https://example.com'): NotionAPIBlock {
  return createMockBlock({
    type: 'bookmark',
    bookmark: { url, caption: [] },
  } as Partial<NotionAPIBlock>);
}

// ============================================
// 테스트
// ============================================

describe('guards', () => {
  describe('isImageBlock', () => {
    it('이미지 블록이면 true를 반환한다', () => {
      const block = createMockImageBlock();
      expect(isImageBlock(block)).toBe(true);
    });

    it('이미지 블록이 아니면 false를 반환한다', () => {
      const block = createMockBlock({ type: 'paragraph' });
      expect(isImageBlock(block)).toBe(false);
    });

    it('type 속성이 없으면 false를 반환한다', () => {
      const block = { id: 'test' } as unknown as NotionAPIBlock;
      expect(isImageBlock(block)).toBe(false);
    });
  });

  describe('isBookmarkBlock', () => {
    it('북마크 블록이면 true를 반환한다', () => {
      const block = createMockBookmarkBlock('https://example.com');
      expect(isBookmarkBlock(block)).toBe(true);
    });

    it('북마크 블록이 아니면 false를 반환한다', () => {
      const block = createMockBlock({ type: 'paragraph' });
      expect(isBookmarkBlock(block)).toBe(false);
    });
  });

  describe('hasChildren', () => {
    it('has_children이 true면 true를 반환한다', () => {
      const block = createMockBlock({ has_children: true });
      expect(hasChildren(block)).toBe(true);
    });

    it('has_children이 false면 false를 반환한다', () => {
      const block = createMockBlock({ has_children: false });
      expect(hasChildren(block)).toBe(false);
    });

    it('has_children 속성이 없으면 false를 반환한다', () => {
      const block = { id: 'test' } as unknown as NotionAPIBlock;
      expect(hasChildren(block)).toBe(false);
    });
  });
});
