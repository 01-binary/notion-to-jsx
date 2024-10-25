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
            url: 'https://example.com/file.pdf',
            expiry_time: '2023-05-05T12:00:00.000Z',
          },
          name: 'test.pdf',
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

const getFileUrlExternalMock = {
  object: 'page',
  properties: {
    [KEY]: {
      type: 'files',
      files: [
        {
          name: 'External File',
          type: 'external',
          external: {
            url: 'https://example.com/external-file.pdf',
          },
        },
      ],
      id: '1',
    },
  },
};

describe('getFileUrl', () => {
  it('유효한 pageId와 유효한 propertyKey가 제공될 때 fileUrl을 반환한다', async () => {
    notionClient.pages.retrieve = vi
      .fn()
      .mockResolvedValue(getFileUrlValidMock);

    const fileUrl = await notionClient.getFileUrl(TEST_ID, KEY);
    expect(fileUrl).toEqual(
      getFileUrlValidMock.properties[KEY].files[0]?.file.url
    );
    expect(notionClient.pages.retrieve).toHaveBeenCalledWith({
      page_id: TEST_ID,
    });
  });

  it('유효하지 않은 pageId와 유효한 propertyKey가 제공될 때 undefined를 반환한다', async () => {
    notionClient.pages.retrieve = vi
      .fn()
      .mockResolvedValue(getFileUrlInValidMock);

    const fileUrl = await notionClient.getFileUrl(TEST_ID, KEY);
    expect(fileUrl).toBeUndefined();
    expect(notionClient.pages.retrieve).toHaveBeenCalledWith({
      page_id: TEST_ID,
    });
  });

  it('유효한 pageId와 유효하지 않은 propertyKey가 제공될 때 undefined를 반환한다', async () => {
    notionClient.pages.retrieve = vi
      .fn()
      .mockResolvedValue(getFileUrlValidMock);

    const fileUrl = await notionClient.getFileUrl(TEST_ID, 'invalidKey');
    expect(fileUrl).toBeUndefined();
    expect(notionClient.pages.retrieve).toHaveBeenCalledWith({
      page_id: TEST_ID,
    });
  });

  it('외부 파일 타입에 대해 undefined를 반환한다', async () => {
    notionClient.pages.retrieve = vi
      .fn()
      .mockResolvedValue(getFileUrlExternalMock);

    const fileUrl = await notionClient.getFileUrl(TEST_ID, KEY);
    expect(fileUrl).toBeUndefined();
    expect(notionClient.pages.retrieve).toHaveBeenCalledWith({
      page_id: TEST_ID,
    });
  });

  it('API 오류를 적절히 처리한다', async () => {
    notionClient.pages.retrieve = vi
      .fn()
      .mockRejectedValue(new Error('API Error'));

    await expect(notionClient.getFileUrl(TEST_ID, KEY)).rejects.toThrow(
      'API Error'
    );
    expect(notionClient.pages.retrieve).toHaveBeenCalledWith({
      page_id: TEST_ID,
    });
  });
});
