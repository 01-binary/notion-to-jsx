import { RichTextItem } from '../components/Renderer/components/RichText/RichTexts';

export interface NotionBlock {
  object: 'block';
  id: string;
  type:
    | 'paragraph'
    | 'heading_1'
    | 'heading_2'
    | 'heading_3'
    | 'bulleted_list_item'
    | 'numbered_list_item'
    | 'code'
    | 'image'
    | 'bookmark'
    | 'table'
    | 'table_row'
    | 'quote'
    | 'toggle';
  paragraph?: {
    rich_text: RichTextItem[];
    color: string;
  };
  heading_1?: {
    rich_text: RichTextItem[];
    color: string;
  };
  heading_2?: {
    rich_text: RichTextItem[];
    color: string;
  };
  heading_3?: {
    rich_text: RichTextItem[];
    color: string;
  };
  bulleted_list_item?: {
    rich_text: RichTextItem[];
    color: string;
  };
  numbered_list_item?: {
    rich_text: RichTextItem[];
    color: string;
  };
  code?: {
    rich_text: RichTextItem[];
    language: string;
    caption: RichTextItem[];
  };
  image?: {
    type: 'file' | 'external';
    file?: { url: string; expiry_time: string };
    external?: { url: string };
    caption: RichTextItem[];
  };
  bookmark?: {
    url: string;
    caption: RichTextItem[];
  };
  table?: {
    table_width: number;
    has_column_header: boolean;
    has_row_header: boolean;
  };
  table_row?: {
    cells: RichTextItem[][];
  };
  quote?: {
    rich_text: RichTextItem[];
    color: string;
  };
  toggle?: {
    rich_text: RichTextItem[];
    color: string;
  };
  children?: NotionBlock[];
  has_children?: boolean;
  parent?: {
    type: string;
    [key: string]: any;
  };
}
