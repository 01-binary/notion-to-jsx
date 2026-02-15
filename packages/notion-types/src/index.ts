/**
 * notion-types
 * Shared types for notion-to-jsx and notion-to-utils
 */

// ============================================
// OpenGraph / Bookmark Metadata
// ============================================

export interface OpenGraphData {
  title: string;
  description: string;
  image: string;
  siteName: string;
  url: string;
  favicon?: string;
}

// ============================================
// Image Format Metadata
// ============================================

export interface ImageFormatMetadata {
  block_width: number;
  block_height: number;
  block_aspect_ratio: number;
}

// ============================================
// Notion Color
// ============================================

export const NOTION_COLORS = [
  'default',
  'gray',
  'brown',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'pink',
  'red',
  'gray_background',
  'brown_background',
  'orange_background',
  'yellow_background',
  'green_background',
  'blue_background',
  'purple_background',
  'pink_background',
  'red_background',
] as const;

export type NotionColor = (typeof NOTION_COLORS)[number];

// ============================================
// RichText
// ============================================

export interface RichTextItem {
  type: 'text' | 'mention' | 'equation';
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: NotionColor;
  };
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: NotionColor;
  plain_text: string;
  href: string | null;
  text?: {
    content: string;
    link: {
      url: string | null;
    } | null;
  };
}

// ============================================
// Base Block
// ============================================

export interface BaseNotionBlock {
  object: 'block';
  id: string;
  children?: NotionBlock[];
  has_children?: boolean;
  parent?: {
    type: string;
    page_id?: string;
    database_id?: string;
    block_id?: string;
    workspace?: boolean;
  };
}

// ============================================
// Block Types
// ============================================

export interface LinkPreviewBlock extends BaseNotionBlock {
  type: 'link_preview';
  link_preview: {
    url: string;
  };
}

export interface ParagraphBlock extends BaseNotionBlock {
  type: 'paragraph';
  paragraph: {
    rich_text: RichTextItem[];
    color: NotionColor;
  };
}

export interface Heading1Block extends BaseNotionBlock {
  type: 'heading_1';
  heading_1: {
    rich_text: RichTextItem[];
    color: NotionColor;
  };
}

export interface Heading2Block extends BaseNotionBlock {
  type: 'heading_2';
  heading_2: {
    rich_text: RichTextItem[];
    color: NotionColor;
  };
}

export interface Heading3Block extends BaseNotionBlock {
  type: 'heading_3';
  heading_3: {
    rich_text: RichTextItem[];
    color: NotionColor;
  };
}

export interface CodeBlock extends BaseNotionBlock {
  type: 'code';
  code: {
    rich_text: RichTextItem[];
    language: string;
    caption: RichTextItem[];
  };
}

export interface ImageBlock extends BaseNotionBlock {
  type: 'image';
  image: {
    type: 'file' | 'external';
    file?: { url: string; expiry_time: string };
    external?: { url: string };
    caption: RichTextItem[];
    format: ImageFormatMetadata;
  };
}

export interface BookmarkBlock extends BaseNotionBlock {
  type: 'bookmark';
  bookmark: {
    url: string;
    caption: RichTextItem[];
    metadata?: OpenGraphData;
  };
}

export interface TableBlock extends BaseNotionBlock {
  type: 'table';
  table: {
    table_width: number;
    has_column_header: boolean;
    has_row_header: boolean;
  };
  children?: TableRowBlock[];
}

export interface TableRowBlock extends BaseNotionBlock {
  type: 'table_row';
  table_row: {
    cells: RichTextItem[][];
  };
}

export interface QuoteBlock extends BaseNotionBlock {
  type: 'quote';
  quote: {
    rich_text: RichTextItem[];
    color: NotionColor;
  };
}

export interface ToggleBlock extends BaseNotionBlock {
  type: 'toggle';
  toggle: {
    rich_text: RichTextItem[];
    color: NotionColor;
  };
}

export interface BulletedListItemBlock extends BaseNotionBlock {
  type: 'bulleted_list_item';
  bulleted_list_item: {
    rich_text: RichTextItem[];
    color: NotionColor;
  };
}

export interface NumberedListItemBlock extends BaseNotionBlock {
  type: 'numbered_list_item';
  numbered_list_item: {
    rich_text: RichTextItem[];
    color: NotionColor;
  };
}

export interface ColumnListBlock extends BaseNotionBlock {
  type: 'column_list';
  children?: ColumnBlock[];
}

export interface ColumnBlock extends BaseNotionBlock {
  type: 'column';
}

export interface VideoBlock extends BaseNotionBlock {
  type: 'video';
  video: {
    caption: RichTextItem[];
    type: 'external' | 'file';
    external?: {
      url: string;
    };
    file?: {
      url: string;
      expiry_time?: string;
    };
  };
}

export interface EmbedBlock extends BaseNotionBlock {
  type: 'embed';
  embed: {
    url: string;
    caption: RichTextItem[];
  };
}

// ============================================
// NotionBlock Union Type
// ============================================

export type NotionBlock =
  | LinkPreviewBlock
  | ParagraphBlock
  | Heading1Block
  | Heading2Block
  | Heading3Block
  | CodeBlock
  | ImageBlock
  | BookmarkBlock
  | TableBlock
  | TableRowBlock
  | QuoteBlock
  | ToggleBlock
  | BulletedListItemBlock
  | NumberedListItemBlock
  | ColumnListBlock
  | ColumnBlock
  | VideoBlock
  | EmbedBlock;
