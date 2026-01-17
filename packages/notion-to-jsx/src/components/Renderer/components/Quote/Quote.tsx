import { memo } from 'react';
import { MemoizedRichText } from '../MemoizedComponents';
import { container } from './styles.css';
import { RichTextItem } from '../RichText/RichTexts';

export interface QuoteProps {
  richTexts: RichTextItem[];
  tabIndex?: number;
}

const Quote = memo(({ richTexts, tabIndex }: QuoteProps) => {
  return (
    <blockquote className={container} tabIndex={tabIndex}>
      <MemoizedRichText richTexts={richTexts} />
    </blockquote>
  );
});

Quote.displayName = 'Quote';

export default Quote;
