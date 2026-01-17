import { describe, it, expect, vi, beforeEach } from 'vitest';
import { enrichImageWithMetadata, addMetadataToImageBlock } from './getImageMetadata';

// probe-image-size 모킹
vi.mock('probe-image-size', () => ({
  default: vi.fn(),
}));

import probe from 'probe-image-size';

describe('getImageMetadata', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('enrichImageWithMetadata', () => {
    it('이미지 메타데이터를 추가한다', async () => {
      vi.mocked(probe).mockResolvedValue({
        width: 1920,
        height: 1080,
        type: 'jpg',
        mime: 'image/jpeg',
        wUnits: 'px',
        hUnits: 'px',
        length: 12345,
        url: 'https://example.com/image.jpg',
      });

      const image = { file: { url: 'https://example.com/image.jpg' } };
      const result = await enrichImageWithMetadata(image);

      expect(result.format).toEqual({
        block_width: 1920,
        block_height: 1080,
        block_aspect_ratio: 1920 / 1080,
      });
    });

    it('기존 format을 유지하면서 메타데이터를 추가한다', async () => {
      vi.mocked(probe).mockResolvedValue({
        width: 800,
        height: 600,
        type: 'png',
        mime: 'image/png',
        wUnits: 'px',
        hUnits: 'px',
        length: 5000,
        url: 'https://example.com/image.png',
      });

      const image = {
        file: { url: 'https://example.com/image.png' },
        format: { block_width: 400 }, // 기존 format
      };
      const result = await enrichImageWithMetadata(image);

      expect(result.format).toEqual({
        block_width: 800, // 새 값으로 덮어씀
        block_height: 600,
        block_aspect_ratio: 800 / 600,
      });
    });

    it('external 이미지도 처리한다', async () => {
      vi.mocked(probe).mockResolvedValue({
        width: 640,
        height: 480,
        type: 'gif',
        mime: 'image/gif',
        wUnits: 'px',
        hUnits: 'px',
        length: 2000,
        url: 'https://external.com/image.gif',
      });

      const image = { external: { url: 'https://external.com/image.gif' } };
      const result = await enrichImageWithMetadata(image);

      expect(result.format?.block_width).toBe(640);
      expect(result.format?.block_height).toBe(480);
    });

    it('URL이 없으면 원본 이미지를 반환한다', async () => {
      const image = {};
      const result = await enrichImageWithMetadata(image);

      expect(result).toEqual(image);
      expect(probe).not.toHaveBeenCalled();
    });

    it('probe 실패 시 원본 이미지를 반환한다', async () => {
      vi.mocked(probe).mockRejectedValue(new Error('Failed to probe'));

      const image = { file: { url: 'https://example.com/broken.jpg' } };
      const result = await enrichImageWithMetadata(image);

      expect(result).toEqual(image);
    });

    it('height가 0이면 aspect_ratio를 1로 설정한다', async () => {
      vi.mocked(probe).mockResolvedValue({
        width: 100,
        height: 0,
        type: 'svg',
        mime: 'image/svg+xml',
        wUnits: 'px',
        hUnits: 'px',
        length: 500,
        url: 'https://example.com/image.svg',
      });

      const image = { file: { url: 'https://example.com/image.svg' } };
      const result = await enrichImageWithMetadata(image);

      expect(result.format?.block_aspect_ratio).toBe(1);
    });

    it('원본 이미지를 변경하지 않는다 (불변성)', async () => {
      vi.mocked(probe).mockResolvedValue({
        width: 500,
        height: 500,
        type: 'png',
        mime: 'image/png',
        wUnits: 'px',
        hUnits: 'px',
        length: 3000,
        url: 'https://example.com/square.png',
      });

      const originalImage = { file: { url: 'https://example.com/square.png' } };
      const result = await enrichImageWithMetadata(originalImage);

      expect(result).not.toBe(originalImage);
      expect((originalImage as Record<string, unknown>).format).toBeUndefined();
    });
  });

  describe('addMetadataToImageBlock (deprecated)', () => {
    it('이미지 블록에 메타데이터를 추가한다', async () => {
      vi.mocked(probe).mockResolvedValue({
        width: 1200,
        height: 800,
        type: 'jpg',
        mime: 'image/jpeg',
        wUnits: 'px',
        hUnits: 'px',
        length: 10000,
        url: 'https://example.com/photo.jpg',
      });

      const block = {
        type: 'image',
        image: { file: { url: 'https://example.com/photo.jpg' } },
      };
      const result = await addMetadataToImageBlock(block);

      expect(result.image?.format?.block_width).toBe(1200);
      expect(result.image?.format?.block_height).toBe(800);
    });

    it('이미지 블록이 아니면 그대로 반환한다', async () => {
      const block = { type: 'paragraph', paragraph: { text: [] } };
      const result = await addMetadataToImageBlock(block as any);

      expect(result).toEqual(block);
      expect(probe).not.toHaveBeenCalled();
    });

    it('image 속성이 없으면 그대로 반환한다', async () => {
      const block = { type: 'image' };
      const result = await addMetadataToImageBlock(block as any);

      expect(result).toEqual(block);
      expect(probe).not.toHaveBeenCalled();
    });
  });
});
