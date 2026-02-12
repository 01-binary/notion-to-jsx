import type { RichTextItem } from 'notion-to-jsx';

const defaultAnnotations = {
  bold: false,
  italic: false,
  strikethrough: false,
  underline: false,
  code: false,
  color: 'default',
};

export const createRichText = (
  content: string,
  overrides?: Partial<RichTextItem['annotations']>,
  link?: string
): RichTextItem => ({
  type: 'text',
  annotations: { ...defaultAnnotations, ...overrides },
  bold: overrides?.bold ?? false,
  italic: overrides?.italic ?? false,
  strikethrough: overrides?.strikethrough ?? false,
  underline: overrides?.underline ?? false,
  code: overrides?.code ?? false,
  color: overrides?.color ?? 'default',
  plain_text: content,
  href: link ?? null,
  text: {
    content,
    link: link ? { url: link } : null,
  },
});

export const plainText = (content: string) => createRichText(content);
export const boldText = (content: string) => createRichText(content, { bold: true });
export const italicText = (content: string) => createRichText(content, { italic: true });
export const strikethroughText = (content: string) => createRichText(content, { strikethrough: true });
export const underlineText = (content: string) => createRichText(content, { underline: true });
export const codeText = (content: string) => createRichText(content, { code: true });
export const colorText = (content: string, color: string) => createRichText(content, { color });
export const linkText = (content: string, url: string) => createRichText(content, {}, url);
