import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import Client from '.';

let notionClient: Client;

beforeAll(() => {
  notionClient = new Client();
});

afterEach(() => {
  vi.restoreAllMocks();
});

const TEST_ID = 'TEST_PAGE_ID';

// Mock response data
const mockBlockResponse1 = {
  object: 'list',
  results: [
    {
      object: 'block',
      id: 'block1',
      type: 'paragraph',
      paragraph: { text: [{ text: { content: 'Test content 1' } }] },
    },
    {
      object: 'block',
      id: 'block2',
      type: 'heading_1',
      heading_1: { text: [{ text: { content: 'Test heading' } }] },
    },
  ],
  next_cursor: 'cursor1',
  has_more: true,
};

const mockBlockResponse2 = {
  object: 'list',
  results: [
    {
      object: 'block',
      id: 'block3',
      type: 'numbered_list_item',
      numbered_list_item: { text: [{ text: { content: 'Test list item' } }] },
    },
  ],
  next_cursor: null,
  has_more: false,
};

describe('getPageBlocks', () => {
  it('페이지의 모든 블록을 가져온다', async () => {
    const listMock = vi
      .fn()
      .mockResolvedValueOnce(mockBlockResponse1)
      .mockResolvedValueOnce(mockBlockResponse2);

    notionClient.blocks.children.list = listMock;

    const blocks = await notionClient.getPageBlocks(TEST_ID);
    expect(blocks).toHaveLength(3); // Total blocks from both responses
    expect(blocks[0]!.id).toBe('block1');
    expect(blocks[1]!.id).toBe('block2');
    expect(blocks[2]!.id).toBe('block3');

    // Verify pagination handling
    expect(listMock).toHaveBeenCalledTimes(2);
    expect(listMock).toHaveBeenNthCalledWith(1, {
      block_id: TEST_ID,
      start_cursor: undefined,
    });
    expect(listMock).toHaveBeenNthCalledWith(2, {
      block_id: TEST_ID,
      start_cursor: 'cursor1',
    });
  });

  it('API 호출 실패시 빈 배열을 반환한다', async () => {
    notionClient.blocks.children.list = vi
      .fn()
      .mockRejectedValue(new Error('API Error'));

    const blocks = await notionClient.getPageBlocks(TEST_ID);

    expect(blocks).toEqual([]);
    expect(notionClient.blocks.children.list).toHaveBeenCalledWith({
      block_id: TEST_ID,
      start_cursor: undefined,
    });
  });
});
