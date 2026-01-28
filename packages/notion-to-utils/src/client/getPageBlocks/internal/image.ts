/**
 * 이미지 블록 처리 유틸리티
 */

import probe from 'probe-image-size';
import type {
  ImageBlockContent,
  ImageFormatMetadata,
  NotionBlock,
  ImageBlock,
} from '../../types';
import { formatNotionImageUrl } from '../../../utils/formatNotionImageUrl';
import { imageMetadataCache } from './cache';

/**
 * 이미지 블록에서 URL을 추출합니다.
 * file과 external 이미지 소스 모두 처리합니다.
 */
export function extractImageUrl(image: ImageBlockContent): string | null {
  if (image.file?.url) {
    return image.file.url;
  }
  if (image.external?.url) {
    return image.external.url;
  }
  return null;
}

/**
 * 이미지 블록의 URL을 업데이트합니다.
 * 새로운 객체를 반환합니다 (불변성 유지).
 */
function updateImageUrl(
  image: ImageBlockContent,
  newUrl: string,
): ImageBlockContent {
  if (image.file?.url) {
    return {
      ...image,
      file: { ...image.file, url: newUrl },
    };
  }

  if (image.external?.url) {
    return {
      ...image,
      external: { ...image.external, url: newUrl },
    };
  }

  return image;
}

/**
 * 이미지 URL에서 메타데이터(너비, 높이, 종횡비)를 추출합니다.
 * LRU 캐시를 사용하여 동일 URL에 대한 중복 요청을 방지합니다.
 */
async function getImageMetadata(
  url: string,
): Promise<ImageFormatMetadata | null> {
  const cached = imageMetadataCache.get(url);
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
    imageMetadataCache.set(url, null);
    return null;
  }
}

/**
 * 이미지 블록에 메타데이터(크기 정보)를 추가합니다.
 * 새로운 객체를 반환합니다 (불변성).
 */
async function enrichImageWithMetadata(
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

/**
 * 이미지 블록에 메타데이터를 보강합니다: URL 포맷팅 및 크기 정보 추가.
 * 새로운 블록 객체를 반환합니다 (불변성).
 */
export async function enrichImageBlock(
  block: ImageBlock,
): Promise<NotionBlock> {
  const image = block.image as ImageBlockContent;
  const url = extractImageUrl(image);

  // 이미지 URL 포맷팅
  const formattedImage = url
    ? updateImageUrl(image, formatNotionImageUrl(url, block.id))
    : image;

  // 메타데이터 추가 (크기 정보)
  const enrichedImage = await enrichImageWithMetadata(formattedImage);

  return {
    ...block,
    image: enrichedImage,
  } as NotionBlock;
}
