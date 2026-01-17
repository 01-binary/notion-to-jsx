import probe from 'probe-image-size';
import type { ImageBlockContent, ImageFormatMetadata } from '../types';
import { extractImageUrl } from '../types';

/**
 * 이미지 URL에서 메타데이터(너비, 높이, 종횡비)를 추출합니다.
 *
 * @param url - 이미지 URL
 * @returns 이미지 메타데이터 또는 실패 시 null
 */
async function getImageMetadata(
  url: string
): Promise<ImageFormatMetadata | null> {
  try {
    const result = await probe(url);
    return {
      block_width: result.width,
      block_height: result.height,
      block_aspect_ratio: result.height > 0 ? result.width / result.height : 1,
    };
  } catch {
    // 이미지 메타데이터는 선택적 기능이므로 조용히 실패
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
  image: ImageBlockContent
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

/**
 * @deprecated enrichImageWithMetadata를 사용하세요.
 * 이 함수는 블록을 직접 변경합니다 - 하위 호환성을 위해 유지됩니다.
 */
export async function addMetadataToImageBlock(block: {
  type: string;
  image?: ImageBlockContent;
}): Promise<typeof block> {
  if (block.type !== 'image' || !block.image) {
    return block;
  }

  const enrichedImage = await enrichImageWithMetadata(block.image);
  block.image = enrichedImage;
  return block;
}
