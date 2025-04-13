import React from 'react';
import { richText, link } from './styles.css';

export interface RichTextItem {
  type: 'text' | 'mention' | string;
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

  text?: {
    content: string;
    link: string | null;
  };
}

export interface RichTextProps {
  richTexts: RichTextItem[];
}

/**
 * 링크 컴포넌트를 생성하는 함수
 */
const renderLink = (href: string, content: React.ReactNode) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={link}>
    {content}
  </a>
);

const RichTexts: React.FC<RichTextProps> = ({ richTexts }) => {
  return (
    <>
      {richTexts.map((text, index) => {
        const { bold, italic, strikethrough, underline, code } =
          text.annotations;

        // 컨텐츠 렌더링 로직
        let content: React.ReactNode;

        // TODO: Refactor
        switch (text.type) {
          case 'text': {
            if (text.text) {
              const { text: textData } = text;
              content = textData.link
                ? renderLink(textData.link, textData.content)
                : textData.content;
            } else {
              content = text.plain_text;
            }
            break;
          }

          case 'mention': {
            content = text.href
              ? renderLink(text.href, text.plain_text)
              : text.plain_text;
            break;
          }

          default: {
            content = text.plain_text;
          }
        }

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
