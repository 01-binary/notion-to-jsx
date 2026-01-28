import { NOTION_ID_LENGTH, NOTION_IMAGE_BASE_URL } from './constants';

/** 유효한 https URL인지 확인 */
const isValidHttpsUrl = (url: string | undefined): url is string =>
  typeof url === 'string' && url.startsWith('https://');

/** 이미 notion.so 이미지 URL 형식인지 확인 */
const isNotionImageUrl = (url: string): boolean =>
  url.includes(NOTION_IMAGE_BASE_URL);

/** URL에서 쿼리 파라미터 제거 */
const removeQueryParams = (url: string): string =>
  url.includes('?') ? (url.split('?')[0] ?? url) : url;

/** 노션 ID에 하이픈 추가 (UUID 형식: 8-4-4-4-12) */
const formatNotionId = (id: string): string => {
  if (id.length !== NOTION_ID_LENGTH) return id;
  return `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(16, 20)}-${id.slice(20)}`;
};

/** 노션 이미지 URL 조립 */
const buildNotionImageUrl = (encodedUrl: string, blockId?: string): string => {
  let url = `${NOTION_IMAGE_BASE_URL}${encodedUrl}`;

  if (blockId) {
    url += `?table=block&id=${formatNotionId(blockId)}`;
  }

  url += url.includes('?') ? '&cache=v2' : '?cache=v2';
  return url;
};

/**
 * S3 URL을 notion.so/image/ 형식으로 변환합니다.
 */
export const formatNotionImageUrl = (
  url: string | undefined,
  blockId?: string,
): string => {
  if (!isValidHttpsUrl(url)) return url ?? '';
  if (isNotionImageUrl(url)) return url;

  try {
    const baseUrl = removeQueryParams(url);
    return buildNotionImageUrl(encodeURIComponent(baseUrl), blockId);
  } catch {
    return url;
  }
};
