import { memo } from 'react';
import { MemoizedRichText } from '../MemoizedComponents';
import { container } from './styles.css';
import type { QuoteBlock } from 'notion-types';

type QuoteData = QuoteBlock['quote'];

export interface QuoteProps {
  quote: QuoteData;
}

const Quote = memo(({ quote }: QuoteProps) => {
  return (
    <blockquote className={container}>
      <MemoizedRichText richTexts={quote.rich_text} />
    </blockquote>
  );
});

Quote.displayName = 'Quote';

export default Quote;
