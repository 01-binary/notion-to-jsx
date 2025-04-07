import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import Client from '.';

let notionClient: Client;

beforeAll(() => {
  notionClient = new Client();
});

afterEach(() => {
  vi.restoreAllMocks();
});

const TEST_ID = 'TEMP';

// Mock response data
const getPagePropertiesMock = {
  object: 'page',
  id: TEST_ID,
  properties: {
    Category: { id: '1', type: 'text', text: { content: 'Category A' } },
    Slug: { id: '2', type: 'text', text: { content: 'slug-value' } },
    Date: { id: '3', type: 'date', date: { start: '2023-05-01' } },
  },
};

const getPagePropertiesMockWithCover = {
  object: 'page',
  id: TEST_ID,
  properties: {
    Category: { id: '1', type: 'text', text: { content: 'Category A' } },
    Slug: { id: '2', type: 'text', text: { content: 'slug-value' } },
    Date: { id: '3', type: 'date', date: { start: '2023-05-01' } },
  },
  cover: {
    type: 'file',
    file: {
      url: 'https://notion-image.url/test.jpg',
    },
  },
};

describe('getPageProperties', () => {
  it('유효한 pageId가 제공되고 keys가 없으며, extractValues가 false일 때 모든 속성을 반환한다', async () => {
    notionClient.pages.retrieve = vi
      .fn()
      .mockResolvedValue(getPagePropertiesMock);

    // extractValues를 false로 명시적으로 설정
    const properties = await notionClient.getPageProperties(TEST_ID, [], false);
    expect(properties).toEqual(getPagePropertiesMock.properties);
    expect(notionClient.pages.retrieve).toHaveBeenCalledWith({
      page_id: TEST_ID,
    });
  });

  it('유효한 pageId와 keys가 제공될 때, extractValues가 false일 때 지정된 속성만 반환한다', async () => {
    notionClient.pages.retrieve = vi
      .fn()
      .mockResolvedValue(getPagePropertiesMock);

    // extractValues를 false로 명시적으로 설정
    const filteredProperties = await notionClient.getPageProperties(
      TEST_ID,
      ['Category', 'Date'],
      false
    );

    expect(filteredProperties).toEqual({
      Category: getPagePropertiesMock.properties.Category,
      Date: getPagePropertiesMock.properties.Date,
    });
    expect(notionClient.pages.retrieve).toHaveBeenCalledWith({
      page_id: TEST_ID,
    });
  });

  it('유효하지 않은 pageId가 제공될 때 undefined를 반환한다', async () => {
    notionClient.pages.retrieve = vi.fn().mockResolvedValue(null);

    const filteredProperties = await notionClient.getPageProperties(
      TEST_ID,
      ['Category'],
      false
    );

    expect(filteredProperties).toBeUndefined();
    expect(notionClient.pages.retrieve).toHaveBeenCalledWith({
      page_id: TEST_ID,
    });
  });

  it('유효한 pageId가 제공되지만 일치하는 keys가 없을 때 빈 객체를 반환한다', async () => {
    notionClient.pages.retrieve = vi
      .fn()
      .mockResolvedValue(getPagePropertiesMock);

    const filteredProperties = await notionClient.getPageProperties(
      TEST_ID,
      ['NonExistentKey'],
      false
    );

    expect(filteredProperties).toEqual({});
    expect(notionClient.pages.retrieve).toHaveBeenCalledWith({
      page_id: TEST_ID,
    });
  });

  it('API 오류를 적절히 처리한다', async () => {
    notionClient.pages.retrieve = vi
      .fn()
      .mockRejectedValue(new Error('API Error'));

    await expect(notionClient.getPageProperties(TEST_ID)).rejects.toThrow(
      'API Error'
    );
    expect(notionClient.pages.retrieve).toHaveBeenCalledWith({
      page_id: TEST_ID,
    });
  });

  // 커버 이미지 테스트 케이스 추가
  it('파일 타입의 커버 이미지가 있을 때 coverUrl 속성을 추가한다', async () => {
    notionClient.pages.retrieve = vi
      .fn()
      .mockResolvedValue(getPagePropertiesMockWithCover);

    // 테스트 실행
    const properties = await notionClient.getPageProperties(TEST_ID, [], false);
    console.log(properties);
    // 결과 검증
    expect(properties).not.toBeUndefined();
    expect(properties).toHaveProperty('coverUrl');
    expect((properties as Record<string, any>).coverUrl).toEqual({
      type: 'url',
      url: 'https://www.notion.so/image/https%3A%2F%2Fnotion-image.url%2Ftest.jpg?table=block&id=TEMP&cache=v2',
      id: `${TEST_ID}-coverUrl`,
    });
  });

  it('외부 타입의 커버 이미지가 있을 때 coverUrl 속성을 추가한다', async () => {
    const mockWithExternalCover = {
      ...getPagePropertiesMock,
      cover: {
        type: 'external',
        external: {
          url: 'https://external-image.url/test.jpg',
        },
      },
    };

    notionClient.pages.retrieve = vi
      .fn()
      .mockResolvedValue(mockWithExternalCover);

    // 테스트 실행
    const properties = await notionClient.getPageProperties(TEST_ID, [], false);

    // 결과 검증
    expect(properties).not.toBeUndefined();
    expect(properties).toHaveProperty('coverUrl');
    expect((properties as Record<string, any>).coverUrl).toEqual({
      type: 'url',
      url: mockWithExternalCover.cover.external.url,
      id: `${TEST_ID}-coverUrl`,
    });
  });

  it('커버 이미지가 없을 때 coverUrl 속성을 추가하지 않는다', async () => {
    const mockWithoutCover = {
      object: 'page',
      id: TEST_ID,
      properties: {
        Category: { id: '1', type: 'text', text: { content: 'Category A' } },
        Slug: { id: '2', type: 'text', text: { content: 'slug-value' } },
        Date: { id: '3', type: 'date', date: { start: '2023-05-01' } },
      },
      // cover 속성 없음
    };

    notionClient.pages.retrieve = vi.fn().mockResolvedValue(mockWithoutCover);
    // 테스트 실행
    const properties = await notionClient.getPageProperties(TEST_ID, [], false);

    // 결과 검증
    expect(properties).not.toBeUndefined();
    expect(properties as Record<string, any>).not.toHaveProperty('coverUrl');
  });

  it('extractValues가 true일 때 커버 이미지 URL을 추출한다', async () => {
    // 커버 이미지가 있는 mock 데이터
    const mockWithExternalCover = {
      ...getPagePropertiesMock,
      cover: {
        type: 'external',
        external: {
          url: 'https://external-image.url/test.jpg',
        },
      },
    };

    // pages.retrieve만 모킹
    notionClient.pages.retrieve = vi
      .fn()
      .mockResolvedValue(mockWithExternalCover);

    // 테스트 실행 - extractValues를 true로 설정
    const properties = await notionClient.getPageProperties(TEST_ID, [], true);

    // 결과 검증
    expect(properties).not.toBeUndefined();
    expect(properties).toHaveProperty('coverUrl');
    expect((properties as Record<string, any>).coverUrl).toBe(
      mockWithExternalCover.cover.external.url
    );
  });
});
