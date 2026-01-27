import { describe, it, expect } from 'vitest';
import { isImageBlock, isBookmarkBlock, hasChildren } from './utils/guards';
import {
  extractImageUrl,
  extractDomain,
  createBookmarkMetadata,
} from './utils/bookmark';
import { FAVICON_SIZE_PX, GOOGLE_FAVICON_API } from './constants';
import type { NotionAPIBlock, ImageBlockContent } from './types';

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

/** 이미지 콘텐츠 Mock 생성 */
function createMockImageContent(
  overrides: Partial<ImageBlockContent> = {}
): ImageBlockContent {
  return {
    type: 'file',
    file: { url: 'https://s3.amazonaws.com/test.jpg', expiry_time: '' },
    ...overrides,
  } as ImageBlockContent;
}

// ============================================
// 테스트
// ============================================

describe('types', () => {
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

  describe('extractImageUrl', () => {
    it('file 타입 이미지에서 URL을 추출한다', () => {
      const image = createMockImageContent({
        file: { url: 'https://s3.amazonaws.com/test.jpg', expiry_time: '' },
      });
      expect(extractImageUrl(image)).toBe('https://s3.amazonaws.com/test.jpg');
    });

    it('external 타입 이미지에서 URL을 추출한다', () => {
      const image = createMockImageContent({
        type: 'external',
        file: undefined,
        external: { url: 'https://example.com/image.png' },
      });
      expect(extractImageUrl(image)).toBe('https://example.com/image.png');
    });

    it('file이 external보다 우선순위가 높다', () => {
      const image = createMockImageContent({
        file: { url: 'https://s3.amazonaws.com/file.jpg', expiry_time: '' },
        external: { url: 'https://example.com/external.jpg' },
      });
      expect(extractImageUrl(image)).toBe('https://s3.amazonaws.com/file.jpg');
    });

    it('URL이 없으면 null을 반환한다', () => {
      const image = {} as ImageBlockContent;
      expect(extractImageUrl(image)).toBeNull();
    });

    it('빈 file 객체면 null을 반환한다', () => {
      const image = { file: {} } as ImageBlockContent;
      expect(extractImageUrl(image)).toBeNull();
    });
  });

  describe('extractDomain', () => {
    it('URL에서 도메인을 추출한다', () => {
      expect(extractDomain('https://www.example.com/path')).toBe('www.example.com');
    });

    it('서브도메인 없는 URL에서 도메인을 추출한다', () => {
      expect(extractDomain('https://example.com')).toBe('example.com');
    });

    it('포트가 있는 URL에서 도메인을 추출한다', () => {
      expect(extractDomain('https://localhost:3000/test')).toBe('localhost');
    });

    it('잘못된 URL이면 null을 반환한다', () => {
      expect(extractDomain('not-a-url')).toBeNull();
    });

    it('빈 문자열이면 null을 반환한다', () => {
      expect(extractDomain('')).toBeNull();
    });
  });

  describe('createBookmarkMetadata', () => {
    const testUrl = 'https://example.com/article';

    it('OG 데이터가 있으면 메타데이터를 생성한다', () => {
      const ogResult = {
        ogTitle: 'Test Title',
        ogDescription: 'Test Description',
        ogImage: [{ url: 'https://example.com/og-image.jpg' }],
        ogSiteName: 'Example Site',
      };

      const metadata = createBookmarkMetadata(testUrl, ogResult);

      expect(metadata).toEqual({
        title: 'Test Title',
        description: 'Test Description',
        image: 'https://example.com/og-image.jpg',
        siteName: 'Example Site',
        url: testUrl,
        favicon: `${GOOGLE_FAVICON_API}?domain=example.com&sz=${FAVICON_SIZE_PX}`,
      });
    });

    it('Twitter 데이터로 폴백한다', () => {
      const ogResult = {
        twitterTitle: 'Twitter Title',
        twitterDescription: 'Twitter Description',
        twitterImage: [{ url: 'https://example.com/twitter-image.jpg' }],
      };

      const metadata = createBookmarkMetadata(testUrl, ogResult);

      expect(metadata.title).toBe('Twitter Title');
      expect(metadata.description).toBe('Twitter Description');
      expect(metadata.image).toBe('https://example.com/twitter-image.jpg');
    });

    it('OG 데이터가 없으면 도메인으로 폴백한다', () => {
      const metadata = createBookmarkMetadata(testUrl);

      expect(metadata).toEqual({
        title: 'example.com',
        description: '',
        image: '',
        siteName: 'example.com',
        url: testUrl,
        favicon: `${GOOGLE_FAVICON_API}?domain=example.com&sz=${FAVICON_SIZE_PX}`,
      });
    });

    it('잘못된 URL이면 URL 자체를 title로 사용한다', () => {
      const invalidUrl = 'not-a-valid-url';
      const metadata = createBookmarkMetadata(invalidUrl);

      expect(metadata).toEqual({
        title: invalidUrl,
        description: '',
        image: '',
        siteName: '',
        url: invalidUrl,
        favicon: '',
      });
    });

    it('OG 이미지가 없으면 빈 문자열을 사용한다', () => {
      const ogResult = {
        ogTitle: 'Title Only',
      };

      const metadata = createBookmarkMetadata(testUrl, ogResult);

      expect(metadata.image).toBe('');
    });
  });
});
