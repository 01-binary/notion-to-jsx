import { describe, it, expect } from 'vitest';
import {
  isImageBlock,
  isBookmarkBlock,
  hasChildren,
  extractImageUrl,
  extractDomain,
  createBookmarkMetadata,
  FAVICON_SIZE_PX,
  GOOGLE_FAVICON_API,
} from './types';

describe('types', () => {
  describe('isImageBlock', () => {
    it('이미지 블록이면 true를 반환한다', () => {
      const block = { type: 'image', image: { file: { url: 'test.jpg' } } };
      expect(isImageBlock(block as any)).toBe(true);
    });

    it('이미지 블록이 아니면 false를 반환한다', () => {
      const block = { type: 'paragraph' };
      expect(isImageBlock(block as any)).toBe(false);
    });

    it('type 속성이 없으면 false를 반환한다', () => {
      const block = { id: 'test' };
      expect(isImageBlock(block as any)).toBe(false);
    });
  });

  describe('isBookmarkBlock', () => {
    it('북마크 블록이면 true를 반환한다', () => {
      const block = { type: 'bookmark', bookmark: { url: 'https://example.com' } };
      expect(isBookmarkBlock(block as any)).toBe(true);
    });

    it('북마크 블록이 아니면 false를 반환한다', () => {
      const block = { type: 'paragraph' };
      expect(isBookmarkBlock(block as any)).toBe(false);
    });
  });

  describe('hasChildren', () => {
    it('has_children이 true면 true를 반환한다', () => {
      const block = { has_children: true };
      expect(hasChildren(block as any)).toBe(true);
    });

    it('has_children이 false면 false를 반환한다', () => {
      const block = { has_children: false };
      expect(hasChildren(block as any)).toBe(false);
    });

    it('has_children 속성이 없으면 false를 반환한다', () => {
      const block = { id: 'test' };
      expect(hasChildren(block as any)).toBe(false);
    });
  });

  describe('extractImageUrl', () => {
    it('file 타입 이미지에서 URL을 추출한다', () => {
      const image = { file: { url: 'https://s3.amazonaws.com/test.jpg' } };
      expect(extractImageUrl(image)).toBe('https://s3.amazonaws.com/test.jpg');
    });

    it('external 타입 이미지에서 URL을 추출한다', () => {
      const image = { external: { url: 'https://example.com/image.png' } };
      expect(extractImageUrl(image)).toBe('https://example.com/image.png');
    });

    it('file이 external보다 우선순위가 높다', () => {
      const image = {
        file: { url: 'https://s3.amazonaws.com/file.jpg' },
        external: { url: 'https://example.com/external.jpg' },
      };
      expect(extractImageUrl(image)).toBe('https://s3.amazonaws.com/file.jpg');
    });

    it('URL이 없으면 null을 반환한다', () => {
      const image = {};
      expect(extractImageUrl(image)).toBeNull();
    });

    it('빈 file 객체면 null을 반환한다', () => {
      const image = { file: {} };
      expect(extractImageUrl(image as any)).toBeNull();
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
