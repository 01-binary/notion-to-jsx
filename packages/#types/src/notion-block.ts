import { User } from './notion-user';

export interface Block {
  object: 'block';
  id: string;
  parent?: BlockParent;
  type: BlockType;
  created_time?: string; // ISO 8601 문자열
  created_by?: User;
  last_edited_time?: string; // ISO 8601 문자열
  last_edited_by?: User;
  archived?: boolean;
  in_trash?: boolean;
  has_children?: boolean;
}

export type BlockType =
  | 'bookmark'
  | 'breadcrumb'
  | 'bulleted_list_item'
  | 'callout'
  | 'child_database'
  | 'child_page'
  | 'column'
  | 'column_list'
  | 'divider'
  | 'embed'
  | 'equation'
  | 'file'
  | 'heading_1'
  | 'heading_2'
  | 'heading_3'
  | 'image'
  | 'link_preview'
  | 'link_to_page'
  | 'numbered_list_item'
  | 'paragraph'
  | 'pdf'
  | 'quote'
  | 'synced_block'
  | 'table'
  | 'table_of_contents'
  | 'table_row'
  | 'template'
  | 'to_do'
  | 'toggle'
  | 'unsupported'
  | 'video'
  | 'code';

export interface BlockParent {
  type: 'page_id' | 'database_id' | 'block_id' | 'workspace';
  page_id?: string;
  database_id?: string;
  block_id?: string;
  workspace?: boolean;
}

export type RichTextType = 'text' | 'mention' | 'equation';

export type ColorType =
  | 'default'
  | 'gray'
  | 'brown'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'purple'
  | 'pink'
  | 'red'
  | 'gray_background'
  | 'brown_background'
  | 'orange_background'
  | 'yellow_background'
  | 'green_background'
  | 'blue_background'
  | 'purple_background'
  | 'pink_background'
  | 'red_background';

export interface RichText {
  type: RichTextType;
  text?: {
    content: string;
    link?: {
      url: string;
    };
  };
  mention?: MentionType;
  equation?: {
    expression: string;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: ColorType;
  };
  plain_text: string;
  href?: string;
}

export type File = {
  type: 'file' | 'external';
  file?: {
    url: string; // Notion 내부 파일의 URL
    expiry_time: string; // 파일의 만료 시간 (ISO 8601 형식)
  };
  external?: {
    url: string; // 외부 파일의 URL
  };
};

export type Emoji = {
  type: 'emoji';
  emoji: string;
};

export interface BookmarkBlock extends Block {
  type: 'bookmark';
  bookmark: {
    caption: RichText[];
    url: string;
  };
}

export interface BreadcrumbBlock extends Block {
  type: 'breadcrumb';
}

export interface BulletedListItemBlock extends Block {
  type: 'bulleted_list_item';
  bulleted_list_item: {
    rich_text: RichText[];
    color: ColorType; // Notion 색상 옵션
    children?: Block[]; // 하위 블록
  };
}

export interface CalloutBlock extends Block {
  type: 'callout';
  callout: {
    rich_text: RichText[];
    icon?: File | Emoji; // 아이콘 (예: 이모지, 파일 등)
    color: ColorType;
  };
}

export interface ChildDatabaseBlock extends Block {
  type: 'child_database';
  child_database: {
    title: string;
  };
}

export interface ChildPageBlock extends Block {
  type: 'child_page';
  child_page: {
    title: string;
  };
}

export interface CodeBlock extends Block {
  type: 'code';
  code: {
    caption: RichText[];
    rich_text: RichText[];
    language: string;
  };
}

export interface ColumnBlock extends Block {
  type: 'column';
}

export interface ColumnListBlock extends Block {
  type: 'column_list';
}

export interface DividerBlock extends Block {
  type: 'divider';
}

export interface EmbedBlock extends Block {
  type: 'embed';
  embed: {
    url: string;
  };
}

export interface EquationBlock extends Block {
  type: 'equation';
  equation: {
    expression: string;
  };
}

export interface FileBlock extends Block {
  type: 'file';
  file: {
    caption: RichText[];
    name: string;
  } & File;
}

export interface Heading1Block extends Block {
  type: 'heading_1';
  heading_1: {
    rich_text: RichText[];
    color: ColorType;
    is_toggleable: boolean;
  };
}

export interface Heading2Block extends Block {
  type: 'heading_2';
  heading_2: {
    rich_text: RichText[];
    color: ColorType;
    is_toggleable: boolean;
  };
}

export interface Heading3Block extends Block {
  type: 'heading_3';
  heading_3: {
    rich_text: RichText[];
    color: ColorType;
    is_toggleable: boolean;
  };
}

export interface ImageBlock extends Block {
  type: 'image';
  image: File;
}

export interface LinkPreviewBlock extends Block {
  type: 'link_preview';
  link_preview: {
    url: string;
  };
}

export interface NumberedListItemBlock extends Block {
  type: 'numbered_list_item';
  numbered_list_item: {
    rich_text: RichText[];
    color: ColorType;
    children?: Block[];
  };
}

export interface ParagraphBlock extends Block {
  type: 'paragraph';
  paragraph: {
    rich_text: RichText[];
    color: ColorType;
    children?: Block[];
  };
}

export interface PDFBlock extends Block {
  type: 'pdf';
  pdf: {
    caption: RichText[];
  } & File;
}

export interface QuoteBlock extends Block {
  type: 'quote';
  quote: {
    rich_text: RichText[];
    color: ColorType;
    children?: Block[];
  };
}

export interface SyncedBlock extends Block {
  type: 'synced_block';
  synced_block: {
    synced_from: null | {
      block_id: string;
    };
    children?: Block[];
  };
}

export interface TableBlock extends Block {
  type: 'table';
  table: {
    table_width: number;
    has_column_header: boolean;
    has_row_header: boolean;
  };
}

export interface TableOfContentsBlock extends Block {
  type: 'table_of_contents';
  table_of_contents: {
    color: ColorType;
  };
}

/**
 * !deprecated
 */
export interface TemplateBlock extends Block {
  type: 'template';
  template: {
    rich_text: RichText[];
    children?: Block[];
  };
}

export interface ToDoBlock extends Block {
  type: 'to_do';
  to_do: {
    rich_text: RichText[];
    checked?: boolean;
    color: ColorType;
    children?: Block[];
  };
}

export interface ToggleBlock extends Block {
  type: 'toggle';
  toggle: {
    rich_text: RichText[];
    color: ColorType;
    children?: Block[];
  };
}

export interface VideoBlock extends Block {
  type: 'video';
  video: File;
}
