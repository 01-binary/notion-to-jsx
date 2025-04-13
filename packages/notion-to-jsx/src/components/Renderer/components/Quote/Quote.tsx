import React from 'react';
import { MemoizedRichText } from '../MemoizedComponents';
import { container } from './styles.css';

export interface QuoteProps {
  richText: any[];
  tabIndex?: number;
}

const Quote: React.FC<QuoteProps> = ({ richText, tabIndex }) => {
  return (
    <blockquote className={container} tabIndex={tabIndex}>
      <MemoizedRichText richTexts={richText} />
    </blockquote>
  );
};

export default Quote;
