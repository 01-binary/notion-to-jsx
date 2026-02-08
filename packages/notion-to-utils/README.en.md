[한국어](./README.md) | **English**

# notion-to-utils

[![npm version](https://img.shields.io/npm/v/notion-to-utils.svg)](https://www.npmjs.com/package/notion-to-utils)
[![license](https://img.shields.io/npm/l/notion-to-utils.svg)](https://github.com/01-binary/notion-to-jsx/blob/main/LICENSE)

A Notion API wrapper library. Automatically handles image metadata and bookmark OG data when fetching blocks and properties.

## Install

```bash
pnpm add notion-to-utils
```

## Key Features

### Client

An extended client built on `@notionhq/client`. All existing Notion SDK features are available.

```typescript
import Client from 'notion-to-utils';

const client = new Client({ auth: process.env.NOTION_TOKEN });
```

### getPageBlocks

Recursively fetches all blocks from a page.

- Automatic pagination handling
- Includes nested child blocks
- Image blocks: auto-injects size metadata (`width`, `height`, `aspectRatio`)
- Bookmark blocks: auto-injects OG metadata (`title`, `description`, `image`, `favicon`)

```typescript
const blocks = await client.getPageBlocks('page-id');

// Image block example
// {
//   type: 'image',
//   image: {
//     file: { url: '...' },
//     format: { width: 1200, height: 800, aspectRatio: 1.5 }
//   }
// }

// Bookmark block example
// {
//   type: 'bookmark',
//   bookmark: {
//     url: 'https://example.com',
//     metadata: { title: '...', description: '...', image: '...', favicon: '...' }
//   }
// }
```

### getPageProperties

Fetches page properties. Also returns the cover image URL.

```typescript
// Extract all property values
const props = await client.getPageProperties('page-id');
// { Title: 'My Title', Category: { name: 'Tech' }, Published: true, cover: 'https://...' }

// Fetch specific properties only
const props = await client.getPageProperties('page-id', {
  keys: ['Title', 'Category'],
});

// Get raw property objects (without value extraction)
const props = await client.getPageProperties('page-id', {
  extractValues: false,
});
```

### getFileUrl

Extracts a URL from a file property.

```typescript
const fileUrl = await client.getFileUrl('page-id', 'Attachment');
// 'https://prod-files-secure.s3...'
```

### formatNotionImageUrl

Converts S3 URLs to Notion image proxy URLs. Strips AWS auth parameters and generates cacheable URLs.

```typescript
import { formatNotionImageUrl } from 'notion-to-utils';

const url = formatNotionImageUrl(
  'https://prod-files-secure.s3.us-west-2.amazonaws.com/...',
  'block-id'
);
// 'https://www.notion.so/image/https%3A%2F%2Fprod-files-secure...?table=block&id=block-id&cache=v2'
```

## Types

```typescript
import type { NotionBlock } from 'notion-to-utils';
```

## Related Packages

- [notion-to-jsx](https://www.npmjs.com/package/notion-to-jsx) - Notion block React renderer

## License

MIT
