/**
 * 노션 이미지 URL을 깔끔한 형태로 변환하는 함수
 * 
 * S3 URL 형식의 노션 이미지 URL을 notion.so/image/ 형식으로 변환합니다.
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
  url: string,
  blockId?: string,
  userId?: string
): string => {
  // URL이 없거나 유효하지 않은 경우 원래 URL 반환
  if (!url || !url.startsWith('https://')) {
    return url;
  }

  try {
    // 이미 notion.so 형식인 경우 그대로 반환
    if (url.includes('notion.so/image/')) {
      return url;
    }

    // URL 인코딩
    const encodedUrl = encodeURIComponent(url);
    
    // 기본 노션 이미지 URL 형식
    let formattedUrl = `https://www.notion.so/image/${encodedUrl}`;
    
    // 추가 파라미터 설정
    const params: string[] = [];
    
    // 블록 ID가 있는 경우 추가
    if (blockId) {
      params.push(`table=block&id=${blockId}`);
    }
    
    // 사용자 ID가 있는 경우 추가
    if (userId) {
      params.push(`userId=${userId}`);
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
    return url; // 오류 발생 시 원래 URL 반환
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
      const url = imageData.file?.url || imageData.external?.url;
      
      if (url) {
        return formatNotionImageUrl(url, block.id, block.last_edited_by?.id);
      }
    }
    
    return null;
  } catch (error) {
    console.error('블록에서 이미지 URL 추출 중 오류 발생:', error);
    return null;
  }
};
