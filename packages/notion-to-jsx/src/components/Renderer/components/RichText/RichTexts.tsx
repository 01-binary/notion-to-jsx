import { ReactNode } from 'react';
import type { RichTextItem } from 'notion-types';
import { richText, link, emptyRichText } from './styles.css';

export type { RichTextItem };

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

// 모듈 스코프로 이동 - 매 렌더마다 배열 재생성 방지
const NOTION_COLORS: NotionColor[] = [
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

// 타입 가드 함수
const isNotionColor = (color: string): color is NotionColor => {
  return NOTION_COLORS.includes(color as NotionColor);
};

/**
 * 링크 컴포넌트를 생성하는 함수
 */
const renderLink = (href: string, content: ReactNode) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={link}>
    {content}
  </a>
);

export interface RichTextProps {
  richTexts: RichTextItem[];
}

const EmptyRichText = () => <span className={emptyRichText} />;

const RichTexts = ({ richTexts }: RichTextProps) => {
  if (richTexts.length === 0) {
    return <EmptyRichText />;
  }

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

              content = textData.link?.url
                ? renderLink(textData.link.url, textData.content)
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
        // 타입 가드를 사용하여 지원하는 색상인지 검증
        const safeColor = isNotionColor(color) ? color : undefined;

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
