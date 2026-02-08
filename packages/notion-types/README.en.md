[한국어](./README.md) | **English**

# notion-types

Shared type definitions used by `notion-to-jsx` and `notion-to-utils`.

> **Private package**: Used only within the workspace.

## Types

### NotionBlock

A union type of all block types.

```typescript
import type { NotionBlock } from 'notion-types';
```

Supported block types:

| Type | Interface |
|------|-----------|
| `paragraph` | `ParagraphBlock` |
| `heading_1` | `Heading1Block` |
| `heading_2` | `Heading2Block` |
| `heading_3` | `Heading3Block` |
| `code` | `CodeBlock` |
| `image` | `ImageBlock` |
| `bookmark` | `BookmarkBlock` |
| `table` | `TableBlock` |
| `table_row` | `TableRowBlock` |
| `quote` | `QuoteBlock` |
| `toggle` | `ToggleBlock` |
| `bulleted_list_item` | `BulletedListItemBlock` |
| `numbered_list_item` | `NumberedListItemBlock` |
| `column_list` | `ColumnListBlock` |
| `column` | `ColumnBlock` |
| `video` | `VideoBlock` |
| `embed` | `EmbedBlock` |
| `link_preview` | `LinkPreviewBlock` |

### RichTextItem

A Notion rich text item. Contains text formatting (bold, italic, underline, strikethrough, code, color) and link information.

```typescript
import type { RichTextItem } from 'notion-types';
```

### OpenGraphData

OG metadata for bookmark blocks.

```typescript
import type { OpenGraphData } from 'notion-types';

// { title, description, image, siteName, url, favicon? }
```

### ImageFormatMetadata

Size metadata for image blocks.

```typescript
import type { ImageFormatMetadata } from 'notion-types';

// { block_width, block_height, block_aspect_ratio }
```

## License

MIT
