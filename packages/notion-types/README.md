# notion-types

`notion-to-jsx`와 `notion-to-utils`에서 공유하는 타입 정의 패키지입니다.

> **Private 패키지**: 워크스페이스 내부에서만 사용됩니다.

## 타입

### NotionBlock

모든 블록 타입의 유니온 타입입니다.

```typescript
import type { NotionBlock } from 'notion-types';
```

지원하는 블록 타입:

| 타입 | 인터페이스 |
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

Notion 리치 텍스트 항목입니다. 텍스트 서식(bold, italic, underline, strikethrough, code, color)과 링크 정보를 포함합니다.

```typescript
import type { RichTextItem } from 'notion-types';
```

### OpenGraphData

북마크 블록의 OG 메타데이터입니다.

```typescript
import type { OpenGraphData } from 'notion-types';

// { title, description, image, siteName, url, favicon? }
```

### ImageFormatMetadata

이미지 블록의 크기 메타데이터입니다.

```typescript
import type { ImageFormatMetadata } from 'notion-types';

// { block_width, block_height, block_aspect_ratio }
```

## 라이선스

MIT
