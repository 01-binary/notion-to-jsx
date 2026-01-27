import probe from 'probe-image-size';
import type { ImageBlockContent, ImageFormatMetadata } from '../types';
import { extractImageUrl } from './bookmark';
import { imageMetadataCache } from './cache';

/**
 * 이미지 URL에서 메타데이터(너비, 높이, 종횡비)를 추출합니다.
 * LRU 캐시를 사용하여 동일 URL에 대한 중복 요청을 방지합니다.
 *
 * @param url - 이미지 URL
 * @returns 이미지 메타데이터 또는 실패 시 null
 */
async function getImageMetadata(
  url: string,
): Promise<ImageFormatMetadata | null> {
  // 캐시 확인
  const cached = imageMetadataCache.get(url) as
    | ImageFormatMetadata
    | null
    | undefined;
  if (cached !== undefined) {
    return cached;
  }

  try {
    const result = await probe(url);
    const metadata: ImageFormatMetadata = {
      block_width: result.width,
      block_height: result.height,
      block_aspect_ratio: result.height > 0 ? result.width / result.height : 1,
    };
    imageMetadataCache.set(url, metadata);
    return metadata;
  } catch {
    // 이미지 메타데이터는 선택적 기능이므로 조용히 실패
    // 실패도 캐시하여 같은 URL에 대한 반복 실패 방지
    imageMetadataCache.set(url, null);
    return null;
  }
}

/**
 * 이미지 블록에 메타데이터(크기 정보)를 추가합니다.
 * 새로운 객체를 반환합니다 (불변성).
 *
 * @param image - 이미지 블록 콘텐츠
 * @returns 메타데이터가 추가된 이미지 콘텐츠
 */
export async function enrichImageWithMetadata(
  image: ImageBlockContent,
): Promise<ImageBlockContent> {
  const url = extractImageUrl(image);
  if (!url) {
    return image;
  }

  const metadata = await getImageMetadata(url);
  if (!metadata) {
    return image;
  }

  return {
    ...image,
    format: {
      ...image.format,
      ...metadata,
    },
  };
}
