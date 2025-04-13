import React from 'react';
import { MemoizedRichText } from '../MemoizedComponents';
import { container } from './styles.css';
import { RichTextItem } from '../RichText/RichTexts';
import { richText } from '../RichText/styles.css';

export interface QuoteProps {
  richTexts: RichTextItem[];
  tabIndex?: number;
}

const Quote: React.FC<QuoteProps> = ({ richTexts, tabIndex }) => {
  return (
    <blockquote className={container} tabIndex={tabIndex}>
      <MemoizedRichText richTexts={richTexts} />
    </blockquote>
  );
};

export default Quote;
