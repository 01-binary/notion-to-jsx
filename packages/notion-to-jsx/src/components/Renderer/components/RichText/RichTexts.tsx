import React from 'react';
import { richText, link } from './styles.css';

// 지원하는 Notion 색상 타입 정의
type NotionColor =
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
        const { bold, italic, strikethrough, underline, code, color } =
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

        // NOTION COLOR 적용
        // color 값이 지원하는 색상이 아닌 경우 undefined로 처리하여 타입 에러 방지
        const notionColors: NotionColor[] = [
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
        ];

        const safeColor = notionColors.includes(color as NotionColor)
          ? (color as NotionColor)
          : undefined;

        return (
          <span
            key={index}
            className={richText({
              bold,
              italic,
              strikethrough,
              underline,
              code,
              color: safeColor,
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
