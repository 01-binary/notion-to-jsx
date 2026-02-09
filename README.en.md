[한국어](./README.md) | **English**

# notion-to-jsx

[![npm version](https://img.shields.io/npm/v/notion-to-jsx.svg)](https://www.npmjs.com/package/notion-to-jsx)
[![npm version](https://img.shields.io/npm/v/notion-to-utils.svg?label=notion-to-utils)](https://www.npmjs.com/package/notion-to-utils)
[![license](https://img.shields.io/npm/l/notion-to-jsx.svg)](https://github.com/01-binary/notion-to-jsx/blob/main/LICENSE)

A full-stack solution for rendering Notion pages as React components. Fetches data via the official Notion API and renders as JSX.

**[Documentation](https://notion-to-jsx-docs.vercel.app)**

## Features

- **Official Notion API** — Built on `@notionhq/client`
- **Auto metadata injection** — Image dimensions and bookmark OG data fetched automatically
- **17 block types** — Text, lists, images, code, tables, toggles, videos, embeds, and more
- **Dark mode / Table of Contents** — Built-in theme and auto-generated ToC
- **Zero-runtime CSS** — Vanilla Extract based styling

## Packages

| Package | Description | Version |
|---------|-------------|---------|
| [notion-to-utils](./packages/notion-to-utils) | Notion API wrapper (data fetching) | [![npm](https://img.shields.io/npm/v/notion-to-utils.svg)](https://www.npmjs.com/package/notion-to-utils) |
| [notion-to-jsx](./packages/notion-to-jsx) | Notion block React renderer | [![npm](https://img.shields.io/npm/v/notion-to-jsx.svg)](https://www.npmjs.com/package/notion-to-jsx) |

## Quick Start

### 1. Install

```bash
pnpm add notion-to-utils notion-to-jsx react react-dom
```

### 2. Fetch data (server)

```typescript
import Client from 'notion-to-utils';

const client = new Client({ auth: process.env.NOTION_TOKEN });

const blocks = await client.getPageBlocks('page-id');
const props = await client.getPageProperties('page-id');
```

### 3. Render (client)

```tsx
'use client';

import { Renderer } from 'notion-to-jsx';

export default function NotionPage({ blocks, title, cover }) {
  return (
    <Renderer
      blocks={blocks}
      title={title}
      cover={cover}
      isDarkMode={false}
    />
  );
}
```

## Supported Block Types

| Category | Blocks |
|----------|--------|
| Text | Paragraph, Heading 1/2/3, Quote |
| Lists | Bulleted List, Numbered List |
| Media | Image, Video, Bookmark, Embed, Link Preview |
| Code | Code (syntax highlighting) |
| Structure | Table, Toggle, Column |

## Contributing

```bash
git clone https://github.com/01-binary/notion-to-jsx.git
cd notion-to-jsx
pnpm install
pnpm dev
```

## License

MIT
