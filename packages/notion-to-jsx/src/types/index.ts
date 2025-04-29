import { OpenGraphData } from '../components/Renderer/components/Bookmark/type';
import { RichTextItem } from '../components/Renderer/components/RichText/RichTexts';

// 기본 공통 속성
interface BaseNotionBlock {
  object: 'block';
  id: string;
  children?: NotionBlock[];
  has_children?: boolean;
  parent?: {
    type: string;
    [key: string]: any;
  };
}

// 링크 프리뷰 블록
interface LinkPreviewBlock extends BaseNotionBlock {
  type: 'link_preview';
  link_preview: {
    url: string;
  };
}

// 단락 블록
interface ParagraphBlock extends BaseNotionBlock {
  type: 'paragraph';
  paragraph: {
    rich_text: RichTextItem[];
    color: string;
  };
}

// 제목 1 블록
interface Heading1Block extends BaseNotionBlock {
  type: 'heading_1';
  heading_1: {
    rich_text: RichTextItem[];
    color: string;
  };
}

// 제목 2 블록
interface Heading2Block extends BaseNotionBlock {
  type: 'heading_2';
  heading_2: {
    rich_text: RichTextItem[];
    color: string;
  };
}

// 제목 3 블록
interface Heading3Block extends BaseNotionBlock {
  type: 'heading_3';
  heading_3: {
    rich_text: RichTextItem[];
    color: string;
  };
}

// 코드 블록
interface CodeBlock extends BaseNotionBlock {
  type: 'code';
  code: {
    rich_text: RichTextItem[];
    language: string;
    caption: RichTextItem[];
  };
}

// 이미지 블록
interface ImageBlock extends BaseNotionBlock {
  type: 'image';
  image: {
    type: 'file' | 'external';
    file?: { url: string; expiry_time: string };
    external?: { url: string };
    caption: RichTextItem[];
    format: {
      block_width: number;
      block_height: number;
      block_aspect_ratio: number;
    };
  };
}

// 북마크 블록
interface BookmarkBlock extends BaseNotionBlock {
  type: 'bookmark';
  bookmark: {
    url: string;
    caption: RichTextItem[];
    metadata?: OpenGraphData;
  };
}

// 테이블 블록
export interface TableBlock extends BaseNotionBlock {
  type: 'table';
  table: {
    table_width: number;
    has_column_header: boolean;
    has_row_header: boolean;
  };
  children?: TableRowBlock[];
}

// 테이블 행 블록
export interface TableRowBlock extends BaseNotionBlock {
  type: 'table_row';
  table_row: {
    cells: RichTextItem[][];
  };
}

// 인용 블록
interface QuoteBlock extends BaseNotionBlock {
  type: 'quote';
  quote: {
    rich_text: RichTextItem[];
    color: string;
  };
}

// 토글 블록
export interface ToggleBlock extends BaseNotionBlock {
  type: 'toggle';
  toggle: {
    rich_text: RichTextItem[];
    color: string;
  };
}

// 목록 항목 블록 (불릿)
export interface BulletedListItemBlock extends BaseNotionBlock {
  type: 'bulleted_list_item';
  bulleted_list_item: {
    rich_text: RichTextItem[];
    color: string;
  };
}

// 목록 항목 블록 (번호)
export interface NumberedListItemBlock extends BaseNotionBlock {
  type: 'numbered_list_item';
  numbered_list_item: {
    rich_text: RichTextItem[];
    color: string;
  };
}

// 컬럼 리스트 블록
export interface ColumnListBlock extends BaseNotionBlock {
  type: 'column_list';
  children?: ColumnBlock[];
}

// 컬럼 블록
export interface ColumnBlock extends BaseNotionBlock {
  type: 'column';
}

// 최종 NotionBlock 타입은 모든 블록 타입의 유니온
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
  | ColumnBlock;
