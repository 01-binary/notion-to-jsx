import { ReactNode } from 'react';
import type { RichTextItem } from 'notion-types';
import { richText, link, emptyRichText } from './styles.css';
import ExternalLink from '../shared/ExternalLink';

type RichTextType = RichTextItem['type'];

const contentRenderers: Partial<
  Record<RichTextType, (text: RichTextItem) => ReactNode>
> = {
  text: (text) => {
    if (text.text) {
      return text.text.link?.url
        ? <ExternalLink href={text.text.link.url} className={link}>{text.text.content}</ExternalLink>
        : text.text.content;
    }
    return text.plain_text;
  },
  mention: (text) => {
    return text.href
      ? <ExternalLink href={text.href} className={link}>{text.plain_text}</ExternalLink>
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

        return (
          <span
            key={`${text.plain_text}-${index}`}
            className={richText({
              bold,
              italic,
              strikethrough,
              underline,
              code,
              color,
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
