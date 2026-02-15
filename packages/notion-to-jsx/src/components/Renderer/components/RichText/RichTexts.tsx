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

const contentRenderers: Record<
  string,
  (text: RichTextItem) => ReactNode
> = {
  text: (text) => {
    if (text.text) {
      return text.text.link?.url
        ? renderLink(text.text.link.url, text.text.content)
        : text.text.content;
    }
    return text.plain_text;
  },
  mention: (text) => {
    return text.href
      ? renderLink(text.href, text.plain_text)
      : text.plain_text;
  },
};

const renderContent = (text: RichTextItem): ReactNode => {
  const renderer = contentRenderers[text.type];
  return renderer ? renderer(text) : text.plain_text;
};

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

        const content = renderContent(text);

        // NOTION COLOR 적용
        // 타입 가드를 사용하여 지원하는 색상인지 검증
        const safeColor = isNotionColor(color) ? color : undefined;

        return (
          <span
            key={`${text.plain_text}-${index}`}
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
