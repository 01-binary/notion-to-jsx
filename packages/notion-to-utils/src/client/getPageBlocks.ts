import { Client } from '@notionhq/client';
import { ListBlockChildrenResponse } from '@notionhq/client/build/src/api-endpoints';

type BlockAttributes = {
  numbered_list_item?: {
    number?: number;
  };
};

type ListBlockChildrenResponseResults = ListBlockChildrenResponse['results'] &
  BlockAttributes;

export async function getPageBlocks(client: Client, pageId: string) {
  try {
    // Get all children blocks with pagination
    let allBlocks: ListBlockChildrenResponseResults = [];
    let hasMore = true;
    let nextCursor = undefined;

    while (hasMore) {
      const response = (await client.blocks.children.list({
        block_id: pageId,
        start_cursor: nextCursor,
      })) as ListBlockChildrenResponse;

      allBlocks = [...allBlocks, ...response.results];
      hasMore = response.has_more;
      nextCursor = response.next_cursor || undefined;
    }

    return allBlocks;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}
