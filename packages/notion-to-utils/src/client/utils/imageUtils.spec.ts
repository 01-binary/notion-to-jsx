import { describe, it, expect } from 'vitest';
import { extractImageUrlWithSource, updateImageUrl } from './imageUtils';

describe('imageUtils', () => {
  describe('extractImageUrlWithSource', () => {
    it('file 타입 이미지에서 URL과 소스를 추출한다', () => {
      const image = { file: { url: 'https://example.com/file.jpg' } };
      const result = extractImageUrlWithSource(image);

      expect(result).toEqual({
        url: 'https://example.com/file.jpg',
        source: 'file',
      });
    });

    it('external 타입 이미지에서 URL과 소스를 추출한다', () => {
      const image = { external: { url: 'https://external.com/image.png' } };
      const result = extractImageUrlWithSource(image);

      expect(result).toEqual({
        url: 'https://external.com/image.png',
        source: 'external',
      });
    });

    it('file이 external보다 우선순위가 높다', () => {
      const image = {
        file: { url: 'https://example.com/file.jpg' },
        external: { url: 'https://external.com/image.png' },
      };
      const result = extractImageUrlWithSource(image);

      expect(result.source).toBe('file');
      expect(result.url).toBe('https://example.com/file.jpg');
    });

    it('URL이 없으면 null을 반환한다', () => {
      const image = {};
      const result = extractImageUrlWithSource(image);

      expect(result).toEqual({
        url: null,
        source: null,
      });
    });
  });

  describe('updateImageUrl', () => {
    it('file 타입 이미지의 URL을 업데이트한다', () => {
      const image = { file: { url: 'https://old.com/image.jpg' } };
      const result = updateImageUrl(image, 'https://new.com/image.jpg');

      expect(result.file?.url).toBe('https://new.com/image.jpg');
    });

    it('external 타입 이미지의 URL을 업데이트한다', () => {
      const image = { external: { url: 'https://old.com/image.png' } };
      const result = updateImageUrl(image, 'https://new.com/image.png');

      expect(result.external?.url).toBe('https://new.com/image.png');
    });

    it('원본 이미지를 변경하지 않는다 (불변성)', () => {
      const original = { file: { url: 'https://old.com/image.jpg' } };
      const result = updateImageUrl(original, 'https://new.com/image.jpg');

      expect(result).not.toBe(original);
      expect(original.file.url).toBe('https://old.com/image.jpg');
    });

    it('URL이 없는 이미지는 그대로 반환한다', () => {
      const image = { format: { block_width: 100 } };
      const result = updateImageUrl(image, 'https://new.com/image.jpg');

      expect(result).toEqual(image);
    });

    it('file의 다른 속성을 유지한다', () => {
      const image = {
        file: { url: 'https://old.com/image.jpg', expiry_time: '2025-01-01' },
      };
      const result = updateImageUrl(image, 'https://new.com/image.jpg');

      expect(result.file?.url).toBe('https://new.com/image.jpg');
      expect(result.file?.expiry_time).toBe('2025-01-01');
    });
  });
});
