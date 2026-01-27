/**
 * 이미지 URL 관련 유틸리티 함수
 */

import type { ImageBlockContent } from '../types/definitions';

/**
 * 이미지 소스 타입 (file 또는 external)
 */
export type ImageSourceType = 'file' | 'external' | null;

/**
 * 이미지 블록에서 URL과 소스 타입을 추출합니다.
 *
 * @param image - 이미지 블록 콘텐츠
 * @returns URL과 소스 타입
 */
export function extractImageUrlWithSource(image: ImageBlockContent): {
  url: string | null;
  source: ImageSourceType;
} {
  if (image.file?.url) {
    return { url: image.file.url, source: 'file' };
  }
  if (image.external?.url) {
    return { url: image.external.url, source: 'external' };
  }
  return { url: null, source: null };
}

/**
 * 이미지 블록의 URL을 업데이트합니다.
 * 새로운 객체를 반환합니다 (불변성 유지).
 *
 * @param image - 원본 이미지 블록 콘텐츠
 * @param newUrl - 새 URL
 * @returns 업데이트된 이미지 블록 콘텐츠
 */
export function updateImageUrl(
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
