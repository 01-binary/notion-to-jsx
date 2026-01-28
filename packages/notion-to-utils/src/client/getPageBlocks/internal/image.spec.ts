import { describe, it, expect } from 'vitest';
import { extractImageUrl } from './image';
import type { ImageBlockContent } from '../../types';

/** 이미지 콘텐츠 Mock 생성 */
function createMockImageContent(
  overrides: Partial<ImageBlockContent> = {},
): ImageBlockContent {
  return {
    type: 'file',
    file: { url: 'https://s3.amazonaws.com/test.jpg', expiry_time: '' },
    ...overrides,
  } as ImageBlockContent;
}

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
