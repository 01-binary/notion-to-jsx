import React from 'react';
import { RichTextItem } from '../../../../types';
import { richText, link } from './styles.css';

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

        const colorValue =
          color === 'default'
            ? 'inherit'
            : color?.includes('_background')
              ? `var(--notion-${color})`
              : `var(--notion-${color})`;

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
            style={{ color: colorValue }}
          >
            {content}
          </span>
        );
      })}
    </>
  );
};

export default RichTexts;
