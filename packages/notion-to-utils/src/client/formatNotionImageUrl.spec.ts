import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  formatNotionImageUrl,
  getFormattedImageUrlFromBlock,
} from './formatNotionImageUrl';

describe('formatNotionImageUrl', () => {
  // 콘솔 에러 메시지 출력 방지
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
    const userId = '5146391e-8b65-47f2-83b6-2bfe81194f32';

    const expected = `https://www.notion.so/image/${encodeURIComponent(s3Url)}?table=block&id=${blockId}&userId=${userId}&cache=v2`;

    const result = formatNotionImageUrl(s3Url, blockId, userId);

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

    // encodeURIComponent에서 오류가 발생하도록 모킹
    const originalEncodeURIComponent = global.encodeURIComponent;
    global.encodeURIComponent = vi.fn(() => {
      throw new Error('인코딩 오류');
    });

    const result = formatNotionImageUrl(mockUrl);

    expect(console.error).toHaveBeenCalled();
    expect(result).toBe(mockUrl);

    // 원래 함수로 복원
    global.encodeURIComponent = originalEncodeURIComponent;
  });
});

describe('getFormattedImageUrlFromBlock', () => {
  // 콘솔 에러 메시지 출력 방지
  const originalConsoleError = console.error;
  beforeEach(() => {
    console.error = vi.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  it('이미지 블록에서 URL을 추출하고 포맷팅해야 함', () => {
    const mockBlock = {
      id: '17f9c6bf-2b17-8016-bf79-dc83ab79fb78',
      type: 'image',
      image: {
        file: {
          url: 'https://prod-files-secure.s3.us-west-2.amazonaws.com/cd7314a5-d906-43b0-81e7-42eff82c02a3/566f127b-9e73-491d-bee6-5afd075653a2/image.png',
        },
      },
      last_edited_by: {
        id: '5146391e-8b65-47f2-83b6-2bfe81194f32',
      },
    };

    const expectedUrl = formatNotionImageUrl(
      mockBlock.image.file.url,
      mockBlock.id,
      mockBlock.last_edited_by.id
    );

    const result = getFormattedImageUrlFromBlock(mockBlock);

    expect(result).toBe(expectedUrl);
  });

  it('external URL이 있는 이미지 블록도 처리해야 함', () => {
    const mockBlock = {
      id: '17f9c6bf-2b17-8016-bf79-dc83ab79fb78',
      type: 'image',
      image: {
        external: {
          url: 'https://example.com/image.jpg',
        },
      },
      last_edited_by: {
        id: '5146391e-8b65-47f2-83b6-2bfe81194f32',
      },
    };

    const expectedUrl = formatNotionImageUrl(
      mockBlock.image.external.url,
      mockBlock.id,
      mockBlock.last_edited_by.id
    );

    const result = getFormattedImageUrlFromBlock(mockBlock);

    expect(result).toBe(expectedUrl);
  });

  it('이미지 블록이 아닌 경우 null을 반환해야 함', () => {
    const mockBlock = {
      id: '17f9c6bf-2b17-8016-bf79-dc83ab79fb78',
      type: 'paragraph',
      paragraph: {
        rich_text: [],
      },
    };

    const result = getFormattedImageUrlFromBlock(mockBlock);

    expect(result).toBeNull();
  });

  it('URL이 없는 이미지 블록은 null을 반환해야 함', () => {
    const mockBlock = {
      id: '17f9c6bf-2b17-8016-bf79-dc83ab79fb78',
      type: 'image',
      image: {},
    };

    const result = getFormattedImageUrlFromBlock(mockBlock);

    expect(result).toBeNull();
  });

  it('블록이 null이면 null을 반환해야 함', () => {
    expect(getFormattedImageUrlFromBlock(null)).toBeNull();
  });

  it('처리 중 오류가 발생하면 null을 반환해야 함', () => {
    const mockBlock = {
      id: '17f9c6bf-2b17-8016-bf79-dc83ab79fb78',
      type: 'image',
      image: {
        file: {
          get url() {
            throw new Error('액세스 오류');
          }
        },
      },
    };

    // 콘솔 에러 스파이 설정
    vi.spyOn(console, 'error').mockImplementation(() => {});

    const result = getFormattedImageUrlFromBlock(mockBlock);

    expect(console.error).toHaveBeenCalled();
    expect(result).toBeNull();
  });
});
