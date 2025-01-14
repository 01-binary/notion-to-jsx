import { describe, it, expect, vi, beforeAll, afterEach } from 'vitest';
import { makePreviewImage } from './makePreviewImage';
import lqip from 'lqip-modern';

beforeAll(() => {
  // lqip-modern 모듈 모킹
  vi.mock('lqip-modern');
  // fetch 모킹
  global.fetch = vi.fn();
});

afterEach(() => {
  vi.clearAllMocks();
});

describe('makePreviewImage', () => {
  it('이미지 URL이 주어졌을 때 PreviewImage 객체를 반환한다', async () => {
    // 테스트 데이터 준비
    const mockImageUrl = 'https://example.com/image.jpg';
    const mockBuffer = Buffer.from('test');
    const mockLqipResult = {
      metadata: {
        dataURIBase64: 'data:image/jpeg;base64,test',
        originalHeight: 100,
        originalWidth: 200,
      },
    };

    // fetch 모의 구현
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockResolvedValue({
      arrayBuffer: () => Promise.resolve(mockBuffer),
    });

    // lqip 모의 구현
    (lqip as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(
      mockLqipResult
    );

    // 함수 실행
    const result = await makePreviewImage(mockImageUrl);

    // 결과 검증
    expect(result).toEqual({
      dataURIBase64: mockLqipResult.metadata.dataURIBase64,
      originalHeight: mockLqipResult.metadata.originalHeight,
      originalWidth: mockLqipResult.metadata.originalWidth,
    });

    // fetch가 올바른 URL로 호출되었는지 확인
    expect(fetch).toHaveBeenCalledWith(mockImageUrl);
    // lqip가 올바른 버퍼로 호출되었는지 확인
    expect(lqip).toHaveBeenCalledWith(mockBuffer);
  });

  it('에러가 발생했을 때 null를 반환한다', async () => {
    const mockImageUrl = 'https://example.com/invalid-image.jpg';

    // fetch 에러 시뮬레이션
    (global.fetch as unknown as ReturnType<typeof vi.fn>).mockRejectedValue(
      new Error('Failed to fetch')
    );

    const result = await makePreviewImage(mockImageUrl);

    expect(result).toBeNull();
  });
});
