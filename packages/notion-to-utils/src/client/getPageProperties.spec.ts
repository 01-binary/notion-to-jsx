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

describe('getPageProperties', () => {
  it('유효한 pageId가 제공되고 keys가 없을 때 모든 속성을 반환한다', async () => {
    notionClient.pages.retrieve = vi
      .fn()
      .mockResolvedValue(getPagePropertiesMock);

    const properties = await notionClient.getPageProperties(TEST_ID);
    expect(properties).toEqual(getPagePropertiesMock.properties);
    expect(notionClient.pages.retrieve).toHaveBeenCalledWith({
      page_id: TEST_ID,
    });
  });

  it('유효한 pageId와 keys가 제공될 때 지정된 속성만 반환한다', async () => {
    notionClient.pages.retrieve = vi
      .fn()
      .mockResolvedValue(getPagePropertiesMock);

    const filteredProperties = await notionClient.getPageProperties(TEST_ID, [
      'Category',
      'Date',
    ]);

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

    const filteredProperties = await notionClient.getPageProperties(TEST_ID, [
      'Category',
    ]);

    expect(filteredProperties).toBeUndefined();
    expect(notionClient.pages.retrieve).toHaveBeenCalledWith({
      page_id: TEST_ID,
    });
  });

  it('유효한 pageId가 제공되지만 일치하는 keys가 없을 때 빈 객체를 반환한다', async () => {
    notionClient.pages.retrieve = vi
      .fn()
      .mockResolvedValue(getPagePropertiesMock);

    const filteredProperties = await notionClient.getPageProperties(TEST_ID, [
      'NonExistentKey',
    ]);

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
});
