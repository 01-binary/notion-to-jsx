import { NOTION_ID_LENGTH } from '../client/types';

/**
 * 노션 이미지 URL을 깔끔한 형태로 변환하는 함수
 *
 * S3 URL 형식의 노션 이미지 URL을 notion.so/image/ 형식으로 변환합니다.
 * AWS 인증 토큰 등의 복잡한 파라미터를 제거하고 기본 이미지 URL만 사용합니다.
 *
 * @param url - 변환할 S3 이미지 URL
 * @param blockId - 블록 ID (선택)
 * @returns 변환된 노션 스타일 이미지 URL
 *
 * @example
 * const formattedUrl = formatNotionImageUrl('https://prod-files-secure.s3.us-west-2.amazonaws.com/...');
 * // 결과: https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2F...
 */
export const formatNotionImageUrl = (
  url: string | undefined,
  blockId?: string
): string => {
  // URL이 없거나 유효하지 않은 경우 빈 문자열 또는 원래 URL 반환
  if (!url || typeof url !== 'string' || !url.startsWith('https://')) {
    return url ?? '';
  }

  try {
    // 이미 notion.so 형식인 경우 그대로 반환
    if (url.includes('notion.so/image/')) {
      return url;
    }

    // S3 URL에서 AWS 인증 파라미터 제거 (? 이후 부분 제거)
    const baseUrl = url.includes('?') ? (url.split('?')[0] ?? url) : url;

    // URL 인코딩
    const encodedUrl = encodeURIComponent(baseUrl);

    // 기본 노션 이미지 URL 형식
    let formattedUrl = `https://www.notion.so/image/${encodedUrl}`;

    // 블록 ID가 있는 경우 추가
    if (blockId) {
      const formattedBlockId = formatNotionId(blockId);
      formattedUrl += `?table=block&id=${formattedBlockId}`;
    }

    // 캐시 버스팅 파라미터 추가
    formattedUrl += formattedUrl.includes('?') ? '&cache=v2' : '?cache=v2';

    return formattedUrl;
  } catch {
    // 오류 발생 시 원래 URL 반환
    return url ?? '';
  }
};

/**
 * 노션 ID 문자열에 하이픈을 추가하는 함수
 *
 * @param id - 하이픈 없는 노션 ID 문자열 (32자)
 * @returns 하이픈이 추가된 UUID 형식의 문자열 (8-4-4-4-12)
 *
 * @example
 * formatNotionId('1239c6bf2b178076a838d17ca1c89783')
 * // 결과: '1239c6bf-2b17-8076-a838-d17ca1c89783'
 */
const formatNotionId = (id: string): string => {
  if (!id || typeof id !== 'string' || id.length !== NOTION_ID_LENGTH) {
    return id;
  }

  // UUID 형식: 8-4-4-4-12
  return `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(16, 20)}-${id.slice(20)}`;
};
