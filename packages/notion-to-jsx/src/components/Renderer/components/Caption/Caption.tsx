import { RichTextItem } from '../RichText/RichTexts';
import { MemoizedRichText } from '../MemoizedComponents';
import { captionStyle } from './styles.css';

interface CaptionProps {
  caption?: RichTextItem[];
}

const Caption = ({ caption }: CaptionProps) => {
  if (!caption || caption.length === 0) return null;

  return (
    <figcaption className={captionStyle}>
      <MemoizedRichText richTexts={caption} />
    </figcaption>
  );
};

export default Caption;
