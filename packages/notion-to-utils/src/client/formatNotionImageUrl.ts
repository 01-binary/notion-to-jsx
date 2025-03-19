/**
 * 노션 이미지 URL을 깔끔한 형태로 변환하는 함수
 *
 * S3 URL 형식의 노션 이미지 URL을 notion.so/image/ 형식으로 변환합니다.
 * AWS 인증 토큰 등의 복잡한 파라미터를 제거하고 기본 이미지 URL만 사용합니다.
 *
 * @param url - 변환할 S3 이미지 URL
 * @param blockId - 블록 ID (선택적)
 * @param userId - 사용자 ID (선택적)
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
      return url; // 이미 노션 이미지 URL 형식인 경우 그대로 반환
    }

    // S3 URL에서 AWS 인증 파라미터 제거 (? 이후 부분 제거)
    // 안전하게 URL 처리 - 항상 문자열 반환 보장
    // 이 시점에서 url은 string 타입이 보장됨
    const baseUrl = url.includes('?') ? url.split('?')[0] : url;

    // URL 인코딩 (문자열만 인코딩 가능)
    // 타입 단언을 사용하여 TypeScript에게 baseUrl이 문자열임을 알림
    const encodedUrl = encodeURIComponent(baseUrl as string);

    // 기본 노션 이미지 URL 형식
    let formattedUrl = `https://www.notion.so/image/${encodedUrl}`;

    // 추가 파라미터 설정
    const params: string[] = [];

    // 블록 ID가 있는 경우 추가
    if (blockId) {
      params.push(`table=block&id=${blockId}`);
    }

    // 추가 파라미터가 있는 경우 URL에 추가
    if (params.length > 0) {
      formattedUrl += `?${params.join('&')}`;
    }

    // 캐시 버스팅 파라미터 추가
    formattedUrl += formattedUrl.includes('?') ? '&' : '?';
    formattedUrl += 'cache=v2';

    return formattedUrl;
  } catch (error) {
    console.error('이미지 URL 변환 중 오류 발생:', error);
    return url ?? ''; // 오류 발생 시 원래 URL 반환
  }
};

/**
 * 노션 블록에서 이미지 URL을 추출하고 포맷팅하는 함수
 *
 * @param block - 노션 블록 객체
 * @returns 포맷팅된 이미지 URL 또는 null
 */
export const getFormattedImageUrlFromBlock = (block: any): string | null => {
  if (!block) return null;

  try {
    // 이미지 블록인 경우
    if (block.type === 'image') {
      const imageData = block.image;
      const url = imageData?.file?.url || imageData?.external?.url;

      // URL이 존재하는 경우 처리
      if (url) {
        // expiry_time 필드가 있는 경우에도 무시하고 URL만 사용
        // URL에서 기본 이미지 경로만 추출하여 사용
        const blockId = block.id;
        return formatNotionImageUrl(url, blockId);
      }
    }

    return null;
  } catch (error) {
    console.error('블록에서 이미지 URL 추출 중 오류 발생:', error);
    return null;
  }
};
