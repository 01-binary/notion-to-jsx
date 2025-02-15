export interface RichTextItem {
  type: 'text';
  text: {
    content: string;
    link: string | null;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href: string | null;
}

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
    | 'bookmark';
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
}
