import React from 'react';
import { richText, link } from './styles.css';

export interface RichTextItem {
  type: 'text';
  text: {
    content: string;
    link: string | null;
  };
  content: string;
  link: string | null;
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
  plain_text: string;
  href: string | null;
}

export interface RichTextProps {
  richTexts: RichTextItem[];
}

const RichTexts: React.FC<RichTextProps> = ({ richTexts }) => {
  return (
    <>
      {richTexts.map((text, index) => {
        const { bold, italic, strikethrough, underline, code, color } =
          text.annotations;

        const content = text.text.link ? (
          <a
            href={text.text.link}
            target="_blank"
            rel="noopener noreferrer"
            className={link}
          >
            {text.text.content}
          </a>
        ) : (
          text.text.content
        );

        // TODO: NOTION COLOR 적용
        // const colorValue =
        //   color === 'default'
        //     ? 'inherit'
        //     : color?.includes('_background')
        //       ? `var(--notion-${color})`
        //       : `var(--notion-${color})`;

        return (
          <span
            key={index}
            className={richText({
              bold,
              italic,
              strikethrough,
              underline,
              code,
            })}
          >
            {content}
          </span>
        );
      })}
    </>
  );
};

export default RichTexts;
