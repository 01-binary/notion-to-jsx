import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { formatNotionImageUrl } from './formatNotionImageUrl';

describe('formatNotionImageUrl', () => {
  // 테스트 중 console.error 억제
  const originalConsoleError = console.error;
  beforeEach(() => {
    console.error = vi.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
    vi.restoreAllMocks();
  });

  it('유효한 S3 URL을 노션 이미지 URL로 변환해야 함', () => {
    const s3Url =
      'https://prod-files-secure.s3.us-west-2.amazonaws.com/cd7314a5-d906-43b0-81e7-42eff82c02a3/566f127b-9e73-491d-bee6-5afd075653a2/image.png';
    const expected = `https://www.notion.so/image/${encodeURIComponent(s3Url)}?cache=v2`;

    const result = formatNotionImageUrl(s3Url);

    expect(result).toBe(expected);
  });

  it('블록 ID와 사용자 ID를 포함한 URL로 변환해야 함', () => {
    const s3Url =
      'https://prod-files-secure.s3.us-west-2.amazonaws.com/cd7314a5-d906-43b0-81e7-42eff82c02a3/566f127b-9e73-491d-bee6-5afd075653a2/image.png';
    const blockId = '17f9c6bf-2b17-8016-bf79-dc83ab79fb78';

    const expected = `https://www.notion.so/image/${encodeURIComponent(s3Url)}?table=block&id=${blockId}&cache=v2`;

    const result = formatNotionImageUrl(s3Url, blockId);

    expect(result).toBe(expected);
  });

  it('블록 ID만 포함한 URL로 변환해야 함', () => {
    const s3Url =
      'https://prod-files-secure.s3.us-west-2.amazonaws.com/cd7314a5-d906-43b0-81e7-42eff82c02a3/566f127b-9e73-491d-bee6-5afd075653a2/image.png';
    const blockId = '17f9c6bf-2b17-8016-bf79-dc83ab79fb78';

    const expected = `https://www.notion.so/image/${encodeURIComponent(s3Url)}?table=block&id=${blockId}&cache=v2`;

    const result = formatNotionImageUrl(s3Url, blockId);

    expect(result).toBe(expected);
  });

  it('이미 노션 이미지 URL 형식인 경우 그대로 반환해야 함', () => {
    const notionUrl =
      'https://www.notion.so/image/https%3A%2F%2Fprod-files-secure.s3.us-west-2.amazonaws.com%2Fcd7314a5-d906-43b0-81e7-42eff82c02a3%2F566f127b-9e73-491d-bee6-5afd075653a2%2Fimage.png?table=block&id=17f9c6bf-2b17-8016-bf79-dc83ab79fb78&cache=v2';

    const result = formatNotionImageUrl(notionUrl);

    expect(result).toBe(notionUrl);
  });

  it('빈 URL이나 유효하지 않은 URL은 그대로 반환해야 함', () => {
    expect(formatNotionImageUrl('')).toBe('');
    expect(formatNotionImageUrl('invalid-url')).toBe('invalid-url');
    expect(formatNotionImageUrl('http://example.com')).toBe(
      'http://example.com'
    );
  });

  it('URL 변환 중 오류가 발생하면 원래 URL을 반환해야 함', () => {
    const mockUrl = 'https://example.com/image.jpg';

    // encodeURIComponent가 오류를 발생하도록 모킹
    const originalEncodeURIComponent = global.encodeURIComponent;
    global.encodeURIComponent = vi.fn(() => {
      throw new Error('인코딩 오류');
    });

    const result = formatNotionImageUrl(mockUrl);

    // 오류 시 원래 URL 반환 (조용히 실패)
    expect(result).toBe(mockUrl);

    // 원래 함수 복원
    global.encodeURIComponent = originalEncodeURIComponent;
  });

  it('undefined URL을 빈 문자열로 반환해야 함', () => {
    expect(formatNotionImageUrl(undefined)).toBe('');
  });

  it('AWS 파라미터가 있는 URL에서 파라미터를 제거해야 함', () => {
    const s3UrlWithParams =
      'https://prod-files-secure.s3.us-west-2.amazonaws.com/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=test';
    const baseUrl =
      'https://prod-files-secure.s3.us-west-2.amazonaws.com/image.png';
    const expected = `https://www.notion.so/image/${encodeURIComponent(baseUrl)}?cache=v2`;

    const result = formatNotionImageUrl(s3UrlWithParams);

    expect(result).toBe(expected);
  });
});
