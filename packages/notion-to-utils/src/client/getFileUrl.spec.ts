import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import Client from '.';

let notionClient: Client;

beforeAll(() => {
  notionClient = new Client();
});

afterEach(() => {
  vi.restoreAllMocks();
});

const KEY = 'media';
const TEST_ID = 'TEMP';

// Mock response data
const getFileUrlValidMock = {
  object: 'page',
  properties: {
    [KEY]: {
      type: 'files',
      files: [
        {
          file: {
            url: 'https://~~',
            expiry_time: 'string',
          },
          name: 'test',
          type: 'file',
        },
      ],
      id: '1',
    },
  },
};

const getFileUrlInValidMock = {
  object: 'page',
  properties: {
    [KEY]: {
      type: 'files',
      files: [],
      id: '1',
    },
  },
};

describe('getFileUrl', () => {
  it('should return fileUrl when valid pageId, valid propertyKey are provided', async () => {
    // Mock the notionClient.pages.retrieve method
    notionClient.pages.retrieve = vi
      .fn()
      .mockResolvedValue(getFileUrlValidMock);

    const fileUrl = await notionClient.getFileUrl(TEST_ID, KEY);
    expect(fileUrl).toEqual(
      getFileUrlValidMock.properties[KEY].files[0]?.file.url
    );
  });

  it('should return undefined when invalid pageId, valid propertyKey are provided', async () => {
    notionClient.pages.retrieve = vi
      .fn()
      .mockResolvedValue(getFileUrlInValidMock);

    const fileUrl = await notionClient.getFileUrl(TEST_ID, KEY);
    expect(fileUrl).toBeUndefined();
  });

  it('should return undefined when valid pageId, invalid propertyKey are provided', async () => {
    notionClient.pages.retrieve = vi
      .fn()
      .mockResolvedValue(getFileUrlValidMock);

    const fileUrl = await notionClient.getFileUrl(TEST_ID, 'temp');
    expect(fileUrl).toBeUndefined();
  });
});
