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
  },
};

describe('getPageProperties', () => {
  it('should return properties when valid pageId is provided', async () => {
    // Mock the notionClient.pages.retrieve method
    notionClient.pages.retrieve = vi
      .fn()
      .mockResolvedValue(getPagePropertiesMock);

    // Test when no keys are provided (should return all properties)
    const properties = await notionClient.getPageProperties(TEST_ID);
    expect(properties).toEqual(getPagePropertiesMock.properties);
  });

  it('should return properties when valid pageId, keys are provided', async () => {
    // Mock the notionClient.pages.retrieve method
    notionClient.pages.retrieve = vi
      .fn()
      .mockResolvedValue(getPagePropertiesMock);

    const filteredProperties = await notionClient.getPageProperties(TEST_ID, [
      'Category',
    ]);

    expect(filteredProperties).toEqual({
      Category: getPagePropertiesMock.properties.Category,
    });
  });

  it('should return undefined when invalid pageId is provided', async () => {
    notionClient.pages.retrieve = vi.fn().mockResolvedValue(null);

    const filteredProperties = await notionClient.getPageProperties(TEST_ID, [
      'Category',
    ]);

    expect(filteredProperties).toBeUndefined();
  });
});
