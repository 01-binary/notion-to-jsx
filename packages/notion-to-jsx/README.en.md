[한국어](./README.md) | **English**

# notion-to-jsx

[![npm version](https://img.shields.io/npm/v/notion-to-jsx.svg)](https://www.npmjs.com/package/notion-to-jsx)
[![license](https://img.shields.io/npm/l/notion-to-jsx.svg)](https://github.com/01-binary/notion-to-jsx/blob/main/LICENSE)

A library for rendering Notion blocks as React JSX components. Supports dark mode, table of contents, and code syntax highlighting.

## Install

```bash
pnpm add notion-to-jsx react react-dom
```

## Usage

Pass block data fetched via [notion-to-utils](https://www.npmjs.com/package/notion-to-utils) to the `Renderer`.

```tsx
'use client';

import { Renderer } from 'notion-to-jsx';
import type { NotionBlock } from 'notion-to-jsx';

interface Props {
  blocks: NotionBlock[];
  title: string;
  cover: string;
}

export default function NotionPage({ blocks, title, cover }: Props) {
  return (
    <Renderer
      blocks={blocks}
      title={title}
      cover={cover}
      isDarkMode={false}
      showToc={true}
      tocStyle={{ top: '80px', scrollOffset: 100 }}
    />
  );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `blocks` | `NotionBlock[]` | (required) | Array of Notion blocks |
| `title` | `string` | - | Page title |
| `cover` | `string` | - | Cover image URL |
| `isDarkMode` | `boolean` | `false` | Enable dark mode |
| `showToc` | `boolean` | `true` | Show table of contents |
| `tocStyle` | `TocStyleOptions` | - | ToC style options |

### TocStyleOptions

```typescript
interface TocStyleOptions {
  top?: string;          // ToC top position (CSS top value)
  scrollOffset?: number; // Scroll offset when clicking a heading (px)
}
```

## Supported Block Types

- **Text**: Paragraph, Heading 1/2/3, Quote
- **Lists**: Bulleted List, Numbered List
- **Media**: Image, Video, Bookmark, Embed, Link Preview
- **Code**: Code (syntax highlighting)
- **Structure**: Table, Toggle, Column
- **Other**: Cover, Title, Table of Contents

## Types

```typescript
import type { NotionBlock, TocStyleOptions } from 'notion-to-jsx';
```

## Related Packages

- [notion-to-utils](https://www.npmjs.com/package/notion-to-utils) - Notion API wrapper (data fetching)

## License

MIT
