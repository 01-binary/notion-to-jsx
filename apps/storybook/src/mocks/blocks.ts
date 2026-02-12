import type {
  RichTextItem,
  ParagraphBlock,
  Heading1Block,
  Heading2Block,
  Heading3Block,
  CodeBlock,
  ImageBlock,
  BookmarkBlock,
  TableBlock,
  TableRowBlock,
  QuoteBlock,
  ToggleBlock,
  BulletedListItemBlock,
  NumberedListItemBlock,
  ColumnListBlock,
  ColumnBlock,
  VideoBlock,
  EmbedBlock,
  LinkPreviewBlock,
} from 'notion-to-jsx';
import { plainText } from './richText';

let idCounter = 0;
const genId = () => `block-${++idCounter}`;

const base = () => ({
  object: 'block' as const,
  id: genId(),
});

export const paragraph = (richTexts: RichTextItem[]): ParagraphBlock => ({
  ...base(),
  type: 'paragraph',
  paragraph: { rich_text: richTexts, color: 'default' },
});

export const heading1 = (richTexts: RichTextItem[]): Heading1Block => ({
  ...base(),
  type: 'heading_1',
  heading_1: { rich_text: richTexts, color: 'default' },
});

export const heading2 = (richTexts: RichTextItem[]): Heading2Block => ({
  ...base(),
  type: 'heading_2',
  heading_2: { rich_text: richTexts, color: 'default' },
});

export const heading3 = (richTexts: RichTextItem[]): Heading3Block => ({
  ...base(),
  type: 'heading_3',
  heading_3: { rich_text: richTexts, color: 'default' },
});

export const code = (
  content: string,
  language: string,
  caption?: RichTextItem[]
): CodeBlock => ({
  ...base(),
  type: 'code',
  code: {
    rich_text: [plainText(content)],
    language,
    caption: caption ?? [],
  },
});

export const image = (
  url: string,
  captionText?: string,
  format?: { block_width: number; block_height: number; block_aspect_ratio: number }
): ImageBlock => ({
  ...base(),
  type: 'image',
  image: {
    type: 'external',
    external: { url },
    caption: captionText ? [plainText(captionText)] : [],
    format: format ?? { block_width: 720, block_height: 405, block_aspect_ratio: 16 / 9 },
  },
});

export const bookmark = (
  url: string,
  metadata?: {
    title: string;
    description: string;
    image: string;
    siteName: string;
    favicon?: string;
  }
): BookmarkBlock => ({
  ...base(),
  type: 'bookmark',
  bookmark: {
    url,
    caption: [],
    metadata: metadata
      ? { ...metadata, url, favicon: metadata.favicon ?? '' }
      : undefined,
  },
});

export const tableRow = (cells: RichTextItem[][]): TableRowBlock => ({
  ...base(),
  type: 'table_row',
  table_row: { cells },
});

export const table = (
  rows: TableRowBlock[],
  options?: { hasColumnHeader?: boolean; hasRowHeader?: boolean }
): TableBlock => ({
  ...base(),
  type: 'table',
  table: {
    table_width: rows[0]?.table_row.cells.length ?? 0,
    has_column_header: options?.hasColumnHeader ?? true,
    has_row_header: options?.hasRowHeader ?? false,
  },
  children: rows,
});

export const quote = (richTexts: RichTextItem[]): QuoteBlock => ({
  ...base(),
  type: 'quote',
  quote: { rich_text: richTexts, color: 'default' },
});

export const toggle = (
  richTexts: RichTextItem[],
  children: ParagraphBlock[]
): ToggleBlock => ({
  ...base(),
  type: 'toggle',
  toggle: { rich_text: richTexts, color: 'default' },
  children,
});

export const bulletedListItem = (
  richTexts: RichTextItem[],
  children?: BulletedListItemBlock[]
): BulletedListItemBlock => ({
  ...base(),
  type: 'bulleted_list_item',
  bulleted_list_item: { rich_text: richTexts, color: 'default' },
  children,
});

export const numberedListItem = (
  richTexts: RichTextItem[],
  children?: NumberedListItemBlock[]
): NumberedListItemBlock => ({
  ...base(),
  type: 'numbered_list_item',
  numbered_list_item: { rich_text: richTexts, color: 'default' },
  children,
});

export const video = (youtubeUrl: string, captionText?: string): VideoBlock => ({
  ...base(),
  type: 'video',
  video: {
    type: 'external',
    external: { url: youtubeUrl },
    caption: captionText ? [plainText(captionText)] : [],
  },
});

export const embed = (url: string, captionText?: string): EmbedBlock => ({
  ...base(),
  type: 'embed',
  embed: {
    url,
    caption: captionText ? [plainText(captionText)] : [],
  },
});

export const column = (children: ParagraphBlock[]): ColumnBlock => ({
  ...base(),
  type: 'column',
  children,
});

export const columnList = (columns: ColumnBlock[]): ColumnListBlock => ({
  ...base(),
  type: 'column_list',
  children: columns,
});

export const linkPreview = (url: string): LinkPreviewBlock => ({
  ...base(),
  type: 'link_preview',
  link_preview: { url },
});
