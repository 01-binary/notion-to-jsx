import { memo } from 'react';
import type { RichTextItem } from 'notion-types';
import { MemoizedRichText } from '../MemoizedComponents';
import { captionStyle } from './styles.css';

interface CaptionProps {
  caption?: RichTextItem[];
}

const Caption = memo(({ caption }: CaptionProps) => {
  if (!caption || caption.length === 0) return null;

  return (
    <figcaption className={captionStyle}>
      <MemoizedRichText richTexts={caption} />
    </figcaption>
  );
});

Caption.displayName = 'Caption';

export default Caption;
